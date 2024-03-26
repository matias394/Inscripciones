import { Component, OnInit, OnDestroy } from '@angular/core';

import { FieldType } from '@ngx-formly/core';

import { LocalAndSesionStorageService } from "../../formularios/services/local-storage.service";
//import { MibaService } from 'src/app/shared/service/miba.service';
import { VisibilidadComponenteFormlyService } from "../../formularios/services/visibilidad-componente-formly.service";
import { Subscription } from 'rxjs';
import {PERFIL_MIBA_PREVISUALIZACION} from "../../formularios/modelos/perfil-miba-previsualizacion";
import {CamposRequeridosMibaService} from "../../formularios/services/campos-requeridos-miba.service";


@Component({
  selector: 'app-textbox-simple',
  templateUrl: './textbox-simple.component.html',
  styleUrls: ['./textbox-simple.component.css']
})
export class TextboxSimpleComponent extends FieldType implements OnInit, OnDestroy {
  valor: string;
  previsualizacion = false;
  editarEnMiba = false;
  readonly: boolean;
  messageValidation:any;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  regex: any;

  constructor(
    private localAndSesionStorageService: LocalAndSesionStorageService,
   private camposRequeridosMibaService: CamposRequeridosMibaService,
    //private mibaService: MibaService,
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService) {
    super();
  }

  ngOnInit() {
    this.regex = this.field.templateOptions.pattern
    this.messageValidation = this.field.validation.messages['pattern']
    this.field.templateOptions['hideLabel'] = true;
    this.subscribirMostrarElemento();
    this.editarEnMiba = this.field.templateOptions['mibaKey'] && this.field.templateOptions['editable'];

    const perfilMiba = this.localAndSesionStorageService.getElement(this.localAndSesionStorageService.PROFILE_MIBA);
   this.previsualizacion = perfilMiba === JSON.stringify(PERFIL_MIBA_PREVISUALIZACION);

    if (this.editarEnMiba) {
      this.to['inputClass'] = 'input-miba';
    }
    this.valor = '';
    this.assingSelf();
  }

  assingSelf(): void {
    const mibaKey = this.field.templateOptions['mibaKey'];
    if (Boolean(mibaKey) || (this.field.templateOptions['noEditableEnGrupo'] && this.field.templateOptions['enEdicion'])) {
      this.readonly = true;
    }

    if (mibaKey) {
      const mibaProfile = JSON.parse(this.localAndSesionStorageService.getElement(this.localAndSesionStorageService.PROFILE_MIBA));
      const valor = Boolean(mibaProfile[mibaKey]) ? mibaProfile[mibaKey] : null;
      this.formControl.setValue(valor);
      this.valor = valor;
      if (this.field.templateOptions.required) {
        this.camposRequeridosMibaService.addCampoRequeridoMiba(mibaKey);
      }
    } else {
      let value = null;
      if (this.field.model[this.field.key as string]) {
        value = this.field.model[this.field.key as string];
      } else if (this.field.templateOptions['defaultValue']) {
        value = this.field.templateOptions['defaultValue'];
      }
      this.valor = value;
      this.formControl.setValue(value);
    }
  }

  isButtonDisabled(): boolean {
    return this.previsualizacion;
  }

  redirigirMiba() {
    if (this.isButtonDisabled()) { return; }
    //this.mibaService.redirigirMibaTriggered();
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.visibilidadComponenteFormlyService.mostrarElemento(this);
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  ngOnDestroy() {
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }

  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex =  new RegExp(this.regex.slice(1,-1), "g")
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }
}
