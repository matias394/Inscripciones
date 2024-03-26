import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { DireccionUsig } from '../direccion-usig';

@Component({
  selector: 'app-modal-direccion-usig',
  templateUrl: './modal-direccion-usig.component.html',
  styleUrls: ['./modal-direccion-usig.component.css']
})
export class ModalDireccionUsigComponent extends ModalComponenteFormulario implements OnInit {


  formGeneral: FormGroup = this.fb.group({
    nombre:new FormControl({value:'',disabled:false},{validators:Validators.required}),
    etiqueta: new FormControl({value:'',disabled:false},{validators:Validators.required}),
    texto: new FormControl({value:'',disabled:false}),
    descripcion: new FormControl({value:'',disabled:false}),
    esSubsanable: new FormControl({value:'',disabled:false}),
    esEditableOperador: new FormControl({value:'',disabled:false}),
    seMuestraEnGrilla:new FormControl({value:'',disabled:false}),
  });

  formValidaciones = this.fb.group({
    campoObligatorio: [],
    validarConRenaper: [],
  });

  esParteDeUnGrupoIterativo: boolean;

  constructor(
    private fb: FormBuilder,
    protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    super(comunicacionBarraSeccionesService);
  }

  ngOnInit() {
    this.formGeneral.get('esEditableOperador').setValue(this.modelo.datosGenerales['esEditableOperador'] ? this.modelo.datosGenerales['esEditableOperador'] : false);
  }
  get nombre (){return this.formGeneral.get('nombre')}
  get etiqueta(){return this.formGeneral.get('etiqueta')}

  getInstancia(): DireccionUsig {
    return new DireccionUsig();
  }

  override completarFormularios(modelo: ModeloCampoFormulario) {
    this.formGeneral.get('nombre').disable();

    super.completarFormularios(modelo);
  }
}
