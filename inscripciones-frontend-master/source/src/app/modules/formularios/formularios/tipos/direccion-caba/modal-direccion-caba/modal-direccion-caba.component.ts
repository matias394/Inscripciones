import { Component, OnInit } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { DireccionCaba } from '../direccion-caba';

@Component({
  selector: 'app-modal-direccion-caba',
  templateUrl: './modal-direccion-caba.component.html',
  styleUrls: ['./modal-direccion-caba.component.css']
})
export class ModalDireccionCabaComponent extends ModalComponenteFormulario implements OnInit {

  formGeneral: FormGroup = this.fb.group({
    nombre: new FormControl({value:'',disabled:false}, {validators:[Validators.required, Validators.maxLength(100)]}),
    esSubsanable: new FormControl({value:'',disabled:false})
  });

  formValidaciones: FormGroup;


  constructor(
    private fb: FormBuilder,
    protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    super(comunicacionBarraSeccionesService);
  }

  ngOnInit() {
  }
get nombre(){return this.formGeneral.get('nombre')}
  getInstancia(): DireccionCaba {
    return new DireccionCaba();
  }

}
