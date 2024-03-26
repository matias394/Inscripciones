import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { Texto } from '../texto';
import {values} from "underscore";
import { CAMPOS_MIBA } from '../campos-miba';

@Component({
  selector: 'app-modal-texto',
  templateUrl: './modal-texto.component.html',
  styleUrls: ['./modal-texto.component.css']
})
export class ModalTextoComponent extends ModalComponenteFormulario implements OnInit {

  @Input() textoLargo = false;
  @Input() textoCorto = false;

  camposMiba = CAMPOS_MIBA;



  formGeneral: FormGroup = this.fb.group({
    nombre:new FormControl ({value:'',disabled:false}, {validators:[Validators.required, Validators.maxLength(100)]}),
    etiqueta:new FormControl ({value:'',disabled:false}, {validators:[Validators.required, Validators.maxLength(200)]}),
    texto: new FormControl ({value:'',disabled:false}),
    descripcion: new FormControl ({value:'',disabled:false}),
    valorPorDefecto: new FormControl ({value:'',disabled:false}),
    integracionMiba: new FormControl ({value:'',disabled:false}),
    esSubsanable: new FormControl ({value:'',disabled:false}),
    esEditableOperador: new FormControl ({value:'',disabled:false}),
    seMuestraEnGrilla: new FormControl ({value:'',disabled:false}),
    valorMiba: new FormControl ({value:'',disabled:false})
  });

  formValidaciones = this.fb.group({
    campoObligatorio:new FormControl ({value:'',disabled:false}),
    longitudMaxima: new FormControl ({value:'',disabled:false},{ validators:[Validators.pattern('^[0-9]*$'), Validators.min(1)]}),
    longitudMinima: new FormControl ({value:'',disabled:false},{ validators:[Validators.pattern('^[0-9]*$'), Validators.min(1)]}),
    expresionRegular: new FormControl ({value:'',disabled:false}),
    mensajeError: new FormControl ({value:'',disabled:false})
  });

  titulo: string;

  constructor(private fb: FormBuilder, protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService) {
    super(comunicacionBarraSeccionesService);
  }
  get nombre() {return this.formGeneral.get('nombre')}
  get etiqueta() {return this.formGeneral.get('etiqueta')}

  get longitudMaxima(){return this.formValidaciones.get('longitudMaxima')}
  get longitudMinima(){return this.formValidaciones.get('longitudMinima')}
  get mensajeError(){return this.formValidaciones.get('mensajeError')}

  getInstancia(): Texto {
    return new Texto();
  }

  ngOnInit() {
    this.camposMiba.sort((a, b) => a.descripcion < b.descripcion ? -1 : 1);
    this.titulo = this.textoLargo ? 'Texto largo' : 'Texto corto';

    this.formGeneral.get('esEditableOperador').setValue(this.modelo.datosGenerales['esEditableOperador'] ? this.modelo.datosGenerales['esEditableOperador'] : false);
    this.modal.show();
  }

  override completarFormularios(modelo: ModeloCampoFormulario) {
    this.formGeneral.get('nombre').disable();

    super.completarFormularios(modelo);

    this.onIntegracionMibaChange(modelo.datosGenerales['valorPorDefecto']);
  }

  override ejecutarValidaciones(): boolean {
    if (!this.formGeneral.get('integracionMiba').value && this.formValidaciones.get('expresionRegular').value) {
      this.formValidaciones.get('mensajeError').setValidators(Validators.required);
    } else {
      this.formValidaciones.get('mensajeError').setValidators(null);
    }
    this.formValidaciones.get('mensajeError').updateValueAndValidity();

    return super.ejecutarValidaciones();
  }

  override guardar() {
    this.submitted = true;
    this.tipoCampoVisibilidad.actualizarValidaciones();
    if (!this.ejecutarValidaciones()) { return; }
  if(this.formGeneral.invalid){
    this.formGeneral.markAllAsTouched()
    return;}

    this.formGeneral.controls['nombre'].enable();
    this.modelo.tipo = this.textoLargo ? 'textoLargo' : 'textoCorto';

    super.persistirCambiosEnModelo(this.formGeneral.value, this.formValidaciones.value, this.tipoCampoVisibilidad.obtenerVisibilidad);
  }

  onIntegracionMibaChange(valorPorDefecto?: string): void {
    const control = this.formGeneral.get('valorMiba');
    if (this.formGeneral.get('integracionMiba').value) {
      this.formGeneral.get('valorPorDefecto').setValue('Valor por defecto de miBA');
      this.formGeneral.get('valorPorDefecto').disable();
      control.setValidators(Validators.required);
    } else {
      this.formGeneral.get('valorPorDefecto').enable();
      this.formGeneral.get('valorPorDefecto').setValue(valorPorDefecto);
      control.setValidators(null);
    }
    control.updateValueAndValidity();
  }
}
