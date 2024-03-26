import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { LocalAndSesionStorageService } from '../../formularios/services/local-storage.service';
import { FormGroup, FormControl} from '@angular/forms';
import { VisibilidadComponenteFormlyService } from '../../formularios/services/visibilidad-componente-formly.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-direccion-caba',
  templateUrl: './direccion-caba.component.html',
  styleUrls: ['./direccion-caba.component.css']
})
export class DireccionCabaComponent extends FieldType implements OnInit, OnDestroy {
  modeloAPersistir: any;
  formModal = new FormGroup({});
  modelModal: any = {};
  fields: FormlyFieldConfig[] = [];
  optionsModal: FormlyFormOptions = {};
  mensajeDomicilio = '';

  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  subsanacion:any;
  constructor(private localAndSesionStorageService: LocalAndSesionStorageService, private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService) {
    super();
  }

  ngOnInit() {
    this.subsanacion = this.field.templateOptions['subsanable']
    this.field.templateOptions['hideLabel'] = true;
    this.subscribirMostrarElemento();
    const mibaProfile = JSON.parse(this.localAndSesionStorageService.getElement(this.localAndSesionStorageService.PROFILE_MIBA));
    const { camposDomicilio } = this.field.templateOptions;
    const { camposDomicilioMiba } = this.field.templateOptions;
    const modeloAPersistir = {};
    /*if (mibaProfile['province'] === 'Ciudad de Buenos Aires') {
      this.fields = camposDomicilioMiba;
    } else {
      this.mensajeDomicilio = 'Por favor, tené en cuenta que debés registrar un domicilio en la Ciudad Autónoma de Buenos Aires para realizar el trámite de denuncia';
      this.fields = camposDomicilio;
    }*/
    this.fields = camposDomicilio;

    for (const field of this.fields) {
      modeloAPersistir[field.key as string] = '';
    }
    this.formControl.setValue(modeloAPersistir);
  }

  noEsCaba(): boolean {
    return this.mensajeDomicilio.length > 0;
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

}
