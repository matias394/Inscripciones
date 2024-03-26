
import { Component, OnInit, OnDestroy } from '@angular/core';

import { FieldType } from '@ngx-formly/core';

import { LocalAndSesionStorageService } from '../../formularios/services/local-storage.service';
import { VisibilidadComponenteFormlyService } from '../../formularios/services/visibilidad-componente-formly.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import {CamposRequeridosMibaService} from "../../formularios/services/campos-requeridos-miba.service";
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-input-fecha',
  templateUrl: './input-fecha.component.html',
  styleUrls: ['./input-fecha.component.css']
})
export class InputFechaComponent extends FieldType implements OnInit, OnDestroy {
  valor: string;

  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  nuevaInscripcion:any

  constructor(
    private localAndSesionStorageService: LocalAndSesionStorageService,
    private camposRequeridosMibaService: CamposRequeridosMibaService,
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService
  ) {
    super();
  }

  ngOnInit() {
    this.nuevaInscripcion = JSON.parse(sessionStorage.getItem('inscribir'));
    this.field.templateOptions['hideLabel'] = true;
    this.assingSelf();
  }

  assingSelf(): void {
    const mibaKey = this.field.templateOptions['mibaKey'];
    this.subscribirMostrarElemento();
    if (mibaKey || (!this.field['editableOperador'] && (this.nuevaInscripcion == null || !this.nuevaInscripcion))) {
      this.formControl.disable();
    }
    if (mibaKey) {
      const mibaProfile = JSON.parse(this.localAndSesionStorageService.getElement(this.localAndSesionStorageService.PROFILE_MIBA));
      {
        this.formControl.setValue(mibaProfile[mibaKey]);
        this.valor = mibaProfile[mibaKey];
      }
      this.camposRequeridosMibaService.addCampoRequeridoMiba(mibaKey);
    } else {
      if (this.field.model[this.field.key as string]) {
        this.valor = this.field.model[this.field.key as string];
      } else if (this.field.templateOptions['defaultValue']) {
        this.valor = this.field.templateOptions['defaultValue'];
      } else {
        this.valor = null;
      }

      const date = this.valor ? this.parseDate(this.valor) : null;
      console.log(date.getFullYear()+'/'+date.getMonth()+'/'+date.getDay())
      const dateString = date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()
      this.formControl.setValue(new Date(new Date(this.valor).getTime()).toISOString().split("T")[0]) ;
      console.log(this.formControl.value)
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

  private parseDate(strDate: string): Date {
    const momentDay = moment(strDate, 'YYYY-MM-DD');
    if (momentDay.isValid()) {
      return momentDay.toDate();
    }
    return moment(strDate, 'DD/MM/YYYY').toDate();
  }
}
