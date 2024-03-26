import { Component, OnInit, OnDestroy } from '@angular/core';
import {FieldType, FormlyFieldConfig} from '@ngx-formly/core';
import { LocalAndSesionStorageService } from '../../formularios/services/local-storage.service';
//import { MibaService } from '../../../../shared/service/miba.service';
import { VisibilidadComponenteFormlyService } from '../../formularios/services/visibilidad-componente-formly.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {PERFIL_MIBA_PREVISUALIZACION} from "../../formularios/modelos/perfil-miba-previsualizacion";
import {CamposRequeridosMibaService} from "../../formularios/services/campos-requeridos-miba.service";
//import { AssignableOnInit } from 'src/app/tramites-template/model/assignable-on-init';

@Component({
  selector: 'app-input-simple',
  templateUrl: './input-simple.component.html',
  styleUrls: ['./input-simple.component.css']
})
export class InputSimpleComponent extends FieldType implements OnInit, OnDestroy {
  valor: string;
  editarEnMiba = false;
  previsualizacion = false;
  readonly = false;
  messageValidation:any;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  regex: any;


  constructor(
    private localAndSesionStorageService: LocalAndSesionStorageService,
    private camposRequeridosMibaService: CamposRequeridosMibaService,
    //private mibaService: MibaService,
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService,
    private fb:FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.regex = this.field.templateOptions.pattern
    this.messageValidation = this.field.validation.messages['pattern']
    this.field.templateOptions['hideLabel'] = true;
    this.editarEnMiba = this.field.templateOptions['mibaKey'] && this.field.templateOptions['editable'];
    const perfilMiba = this.localAndSesionStorageService.getElement(this.localAndSesionStorageService.PROFILE_MIBA);
    this.previsualizacion = perfilMiba === JSON.stringify(PERFIL_MIBA_PREVISUALIZACION);
    this.subscribirMostrarElemento();
    if (this.editarEnMiba) {
      this.to['inputClass'] = 'input-miba';
    }

    this.assingSelf();
  }

  isButtonDisabled(): boolean {
    return this.previsualizacion;
  }


  isReadOnly() {
    return this.readonly;
  }


  assingSelf(): void {
    const mibaKey = this.field.templateOptions['mibaKey'];
    if (mibaKey || (this.field.templateOptions['noEditableEnGrupo'] && this.field.templateOptions['enEdicion'])) {
      this.readonly = true;
      this.field.templateOptions.readonly = true;
    }
    if (mibaKey) {
      const mibaProfile = JSON.parse(this.localAndSesionStorageService.getElement(this.localAndSesionStorageService.PROFILE_MIBA));
      const valor = Boolean(mibaProfile[mibaKey]) ? mibaProfile[mibaKey] : null;
      if (this.isDateString(valor)) {
        this.valor = moment(valor).format('DD/MM/YYYY');
      } else {
        this.valor = valor;
      }
      this.formControl.setValue(valor);
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

  private isDateString(str: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(str) ||
      /^\d{2}\/\d{2}\/\d{4}$/.test(str);
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
