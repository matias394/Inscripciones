import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FieldType } from '@ngx-formly/core';

import { LocalAndSesionStorageService } from '../../formularios/services/local-storage.service';
import { VisibilidadComponenteFormlyService } from '../../formularios/services/visibilidad-componente-formly.service';
import { Subscription } from 'rxjs';
import { Autocompleter } from '@usig-gcba/autocompleter';
import { DireccionNormalizada } from './direccion-normalizada';
import { Normalizador } from '@usig-gcba/normalizador';


@Component({
  selector: 'app-autocompleter-calle',
  templateUrl: './autocompleter-calle.component.html',
  styleUrls: ['./autocompleter-calle.component.css']
})
export class AutocompleterCalleComponent extends FieldType implements OnInit, OnDestroy {

  public flag = true;
  public direcciones: Array<any> = [];
  public nombredireccionselecionada : string;
  public errorCalle = false;
  public errorCalleMensaje = '';
  public direccionselecionada: DireccionNormalizada;
  descripciones:any;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  autocompleter: Autocompleter;
  readonly: boolean = false;

  constructor(private localAndSesionStorageService: LocalAndSesionStorageService, private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService) {
    super();

    };



  ngOnInit() {
    this.field.templateOptions['hideLabel'] = true;
    this.inicializarAutocompleter();
    this.subscribirMostrarElemento();
    this.direccionselecionada = (this.field.model[this.field.key as string]) ? this.field.model[this.field.key as string] : null;
    this.nombredireccionselecionada = this.direccionselecionada ? this.direccionselecionada. nombre : '';
    Normalizador.init().then((res) => this.assingSelf());
    this.descripciones = this.to['descripcion'];
  }

  inicializarAutocompleter() {
    const options = { maxSuggestions: 10, debug: false };

    const suggestionsCallback = (suggestions) => {
      this.direcciones = suggestions;
    };

    const completeSuggestionsCallback = (suggestions) => {
      if (suggestions.length > 0) {
        this.errorCalleMensaje = '';
        this.errorCalle = false;
      } else {
        this.errorCalle = true;
        if (!this.errorCalleMensaje) {
          this.errorCalleMensaje = 'No se hallaron resultados coincidentes con su búsqueda.';
        }
        const direccionError = new DireccionNormalizada(this.nombredireccionselecionada, null, null);
        this.formControl.setValue(direccionError);
      }
      this.direcciones = suggestions;
    }

    const errorCallback = (error) => {
      this.errorCalle = true;
      const errorUsig = error;
      if (errorUsig) {
        this.errorCalleMensaje = this.getErrorCalleMensaje(errorUsig);
      } else {
        this.errorCalle = false;
        this.errorCalleMensaje = '';
      }
      this.direcciones = [];
      const direccionError = new DireccionNormalizada(this.nombredireccionselecionada, null, null);
      this.formControl.setValue(direccionError);
      this.field.formControl.updateValueAndValidity();
    }
    this.autocompleter = new Autocompleter(
      {
        onCompleteSuggestions: completeSuggestionsCallback,
        onSuggestions: suggestionsCallback,
        onError: errorCallback,
      },
      options
    );
    this.autocompleter.addSuggester('Direcciones', { inputPause: 250 });
  }

  assingSelf(): void {
    if (this.field.templateOptions['noEditableEnGrupo'] && this.field.templateOptions['enEdicion']) {
      this.readonly = true;
    }
    if (this.direccionselecionada) {
      this.autocompleter.updateSuggestions(this.direccionselecionada.nombre.toLocaleLowerCase());

      setTimeout(() => {
        this.onselectCalle(this.direcciones[0]);
      }, 1000);

      this.field.formControl.updateValueAndValidity();
    } else {
      this.formControl.setValue(null);
    }
  }

  normalizar(texto: string) {
    if (!texto) {
      this.errorCalle = false;
      this.errorCalleMensaje = '';
      this.formControl.setValue(null);
    }
    this.nombredireccionselecionada = texto;
    this.autocompleter.updateSuggestions(texto);
  }

  getErrorCalleMensaje(errorUsig) {
    switch (errorUsig.type) {
      case 'CALLE_INEXISTENTE':
        return 'No se hallaron resultados coincidentes con su búsqueda.';
      case 'ALTURA_INVALIDA':
        const infoCalle = errorUsig.matchings[0];
        return `La altura indicada no es válida para la calle ingresada. A continuación,
           se muestran algunas opciones válidas halladas: ${infoCalle.calle} ${infoCalle.inicio} – ${infoCalle.fin}`;
      default:
        return 'La dirección ingresada no es válida';
    }
  }

  onselectCalle(direccion: any) {
    if (direccion != null) {
      if (direccion.data.coordenadas) {
        this.direccionselecionada = new DireccionNormalizada(direccion.data.nombre, direccion.data.coordenadas.x, direccion.data.coordenadas.y);
      } else {
        this.direccionselecionada = new DireccionNormalizada(direccion.data.nombre, null, null);
      }

      this.nombredireccionselecionada = direccion.data.nombre;
      this.formControl.setValue(this.direccionselecionada);
      this.direcciones = [];
    } else {
      return;
    }
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.visibilidadComponenteFormlyService.mostrarElemento(this);
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  ngOnDestroy () {
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }

  isReadOnly() {
    return this.readonly;
  }

}
