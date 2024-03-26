import { Component } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import { ModeloTelefono } from '../modelo-telefono';


@Component({
  selector: 'app-modal-telefono',
  templateUrl: './modal-telefono.component.html',
  styleUrls: ['./modal-telefono.component.css']
})
export class ModalTelefonoComponent extends ModalComponenteFormulario {

  valorDependeMiba = true;


  camposMiba = [{
    valor: 'phone',
    descripcion: 'Número fijo'
  }, {
    valor: 'cellphone',
    descripcion: 'Número celular'
  }];

  formGeneral: FormGroup = this.fb.group({
    nombre:new FormControl ({value:'',disabled:false},{validators: Validators.required}),
    etiqueta: new FormControl ({value:'',disabled:false},{validators: Validators.required}),
    descripcion: new FormControl ({value:'',disabled:false}),
    integracionMiba: new FormControl ({value:'',disabled:false}),
    esSubsanable: new FormControl ({value:'',disabled:false}),
    seMuestraEnGrilla: new FormControl ({value:'',disabled:false}),
    valorMiba: new FormControl ({value:'',disabled:false})
  });

  formValidaciones = this.fb.group({
    campoObligatorio: []
  });

  constructor(
    private fb: FormBuilder,
    protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService) {
    super(comunicacionBarraSeccionesService);
  }
  get nombre(){return this.formGeneral.get('nombre')}
  get etiqueta(){return this.formGeneral.get('etiqueta')}
  getInstancia(): ModeloTelefono {
    return new ModeloTelefono();
  }

  override completarFormularios(modelo: ModeloCampoFormulario) {
    this.formGeneral.get('nombre').disable();

    super.completarFormularios(modelo);

    this.onIntegracionMibaChange();
  }

  override guardar() {
    this.submitted = true;
    this.tipoCampoVisibilidad.actualizarValidaciones();
    if (!this.ejecutarValidaciones()) {
      return;
    }
    this.formGeneral.controls['nombre'].enable();
    super.persistirCambiosEnModelo(this.formGeneral.value, this.formValidaciones.value, this.tipoCampoVisibilidad.obtenerVisibilidad);
  }

  onIntegracionMibaChange(): void {
    if (this.formGeneral.get('integracionMiba').value) {
      this.formGeneral.controls['valorMiba'].setValidators(Validators.required);
    } else {
      this.formGeneral.controls['valorMiba'].setValidators(null);
      this.formGeneral.controls['valorMiba'].setErrors(null);
    }
  }
}
