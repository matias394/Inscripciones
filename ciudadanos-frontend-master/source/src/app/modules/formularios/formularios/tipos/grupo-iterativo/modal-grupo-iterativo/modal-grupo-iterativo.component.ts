import { Component, ViewChild } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import { TipoCampoFormularioVisibilidadComponent } from '../../../componentes/tipo-campo-formulario-visibilidad/tipo-campo-formulario-visibilidad.component';
import { GrupoIterativo } from '../grupo-iterativo';

@Component({
  selector: 'app-modal-grupo-iterativo',
  templateUrl: './modal-grupo-iterativo.component.html',
  styleUrls: ['./modal-grupo-iterativo.component.css']
})
export class ModalGrupoIterativoComponent extends ModalComponenteFormulario {
  @ViewChild(TipoCampoFormularioVisibilidadComponent, { static: true }) override tipoCampoVisibilidad: TipoCampoFormularioVisibilidadComponent;

  override submitted = false;
  formGeneral: FormGroup = this.fb.group({
    nombre:new FormControl({value:'',disabled:false},{validators:[Validators.required, Validators.maxLength(100)]}),
    etiqueta:new FormControl({value:'',disabled:false},{validators:[Validators.required, Validators.maxLength(200)]}),
    descripcion: new FormControl({value:'',disabled:false},{validators:[Validators.maxLength(800)]}),
    esSubsanable: new FormControl({value:'',disabled:false}),
    esEditableOperador: new FormControl({value:'',disabled:false}),
  });

  formValidaciones = this.fb.group({
    campoObligatorio: [],
  });

  constructor(
    private fb: FormBuilder,
    protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    super(comunicacionBarraSeccionesService);
  }
  get nombre (){return this.formGeneral.get('nombre')}
  get etiqueta(){return this.formGeneral.get('etiqueta')}
  get descripcion(){return this.formGeneral.get('descripcion')}

  getInstancia(): GrupoIterativo {
    return new GrupoIterativo();
  }

  override completarFormularios(modelo: ModeloCampoFormulario) {
    this.formGeneral.get('nombre').disable();

    super.completarFormularios(modelo);
  }

  override guardar(): void {
    this.submitted = true;
    this.tipoCampoVisibilidad.actualizarValidaciones();

    if (!this.ejecutarValidaciones()) {
      return;
    }

    super.persistirCambiosEnModelo(this.formGeneral.value, this.formValidaciones.value, this.tipoCampoVisibilidad.obtenerVisibilidad);
  }
}
