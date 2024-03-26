import { ListaDesplegable } from '../lista-desplegable';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { OpcionesCamposListaValoresComponent } from '../../../componentes/opciones-campos-lista-valores/opciones-campos-lista-valores.component';
import { TipoCampoFormularioVisibilidadDeLosValoresComponent } from '../../../componentes/tipo-campo-formulario-visibilidad-de-los-valores/tipo-campo-formulario-visibilidad-de-los-valores.component';

@Component({
  selector: 'app-modal-lista-desplegable',
  templateUrl: './modal-lista-desplegable.component.html',
  styleUrls: ['./modal-lista-desplegable.component.css']
})
export class ModalListaDesplegableComponent extends ModalComponenteFormulario implements OnInit {

  @Input() listaConFiltro = false;
  @ViewChild('opcionesListaValores', { static: true }) opcionesListaValores: OpcionesCamposListaValoresComponent;
  @ViewChild(TipoCampoFormularioVisibilidadDeLosValoresComponent, { static: true }) visibilidadDeLosValores: TipoCampoFormularioVisibilidadDeLosValoresComponent;

  formGeneral: FormGroup = this.fb.group({
    nombre: new FormControl ({value:'',disabled:false},{validators:[Validators.required, Validators.maxLength(100)]}),
    etiqueta:new FormControl ({value:'',disabled:false},{validators:[Validators.required, Validators.maxLength(200)]}),
    texto: new FormControl ({value:'',disabled:false},{validators:[Validators.maxLength(200)]}),
    descripcion: new FormControl ({value:'',disabled:false},{validators:[Validators.maxLength(800)]}),
    valores: new FormControl ({value:'',disabled:false},{validators:[Validators.required]}),
    valorPorDefecto: new FormControl ({value:'',disabled:false}),
    esSubsanable: new FormControl ({value:'',disabled:false}),
    esEditableOperador: new FormControl ({value:'',disabled:false}),
    seMuestraEnGrilla: new FormControl ({value:'',disabled:false}),
  });

  formValidaciones: FormGroup = this.fb.group({
    campoObligatorio: [],
  });


  titulo: string;

  constructor(
    private fb: FormBuilder,
    protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    super(comunicacionBarraSeccionesService);
  }
  get nombre (){return this.formGeneral.get('nombre')}
  get etiqueta(){return this.formGeneral.get('etiqueta')}
  get descripcion(){return this.formGeneral.get('descripcion')}
  get valores(){return this.formGeneral.get('valores')}
  get texto(){return this.formGeneral.get('texto')}
  ngOnInit(): void {
    this.titulo = this.listaConFiltro ? 'Lista desplegable con filtro' : 'Lista desplegable';
    this.formGeneral.get('valores').valueChanges.subscribe(
      //valores => this.conceptosPagoComponent.actualizarOpcionesDisponibles(valores)
    );
    this.formGeneral.get('esSubsanable').valueChanges.subscribe(
      //esSubsanable => this.conceptosPagoComponent.deshabilitarOHabilitarConceptosBasadoEnSubsanacion(esSubsanable)
    );
    this.formGeneral.get('esEditableOperador').valueChanges.subscribe(
      //esEditableOperador => this.conceptosPagoComponent.deshabilitarOHabilitarConceptosBasadoEnEdicionOperador(esEditableOperador)
    );
    this.formGeneral.get('esEditableOperador').setValue(this.modelo.datosGenerales['esEditableOperador'] ? this.modelo.datosGenerales['esEditableOperador'] : false);
  }

  getInstancia(): ListaDesplegable {
    return new ListaDesplegable();
  }

  setValorPorDefecto(valores: string[]): void {
    this.formGeneral.patchValue({ valorPorDefecto: valores[0] });
  }

  override completarFormularios(modelo: ListaDesplegable) {
    super.completarFormularios(modelo);
    this.visibilidadDeLosValores.patchFormValue(<object>modelo.visibilidad);
    this.opcionesListaValores.incializarValoresPorDefecto(this.modelo.datosGenerales['valorPorDefecto']);
    //this.conceptosPagoComponent.actualizarOpcionesDisponibles(this.modelo.datosGenerales['valores']);
  }

  override ejecutarValidaciones() {
    const seccionesValidas = super.ejecutarValidaciones();
    const visibilidadDeLosValoresInvalida = this.visibilidadDeLosValores.invalid;
    if (seccionesValidas && visibilidadDeLosValoresInvalida) {
      this.modal.setCurrentTab('visibilidad');
      return false;
    }
    return seccionesValidas;
  }

  override guardar() {
    this.submitted = true;
    this.tipoCampoVisibilidad.actualizarValidaciones();
    if (!this.ejecutarValidaciones()) { return; }

    if(this.formGeneral.invalid){
      this.formGeneral.markAllAsTouched()
      return;}

    if (this.formGeneral.get('nombre')) {
      this.formGeneral.get('nombre').enable();
    }
    this.modelo.tipo = this.listaConFiltro ? 'listaDesplegableFiltro' : 'listaDesplegable';
    const visibilidad = Object.assign({}, this.tipoCampoVisibilidad.obtenerVisibilidad, this.visibilidadDeLosValores.value);
    this.persistirCambiosEnModelo(this.formGeneral.value, this.formValidaciones.value, visibilidad);
  }


  get nombreComponente() {
    return this.formGeneral.get('nombre').value;
  }

  get opciones() {
    return this.formGeneral.get('valores').value;
  }
}
