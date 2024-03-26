import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoCampoFormularioVisibilidadComponent } from '../../../componentes/tipo-campo-formulario-visibilidad/tipo-campo-formulario-visibilidad.component';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import { SelectorExcluyente } from '../selector-excluyente';
import { OpcionesCamposListaValoresComponent } from '../../../componentes/opciones-campos-lista-valores/opciones-campos-lista-valores.component';

@Component({
  selector: 'app-modal-selector-excluyente',
  templateUrl: './modal-selector-excluyente.component.html',
  styleUrls: ['./modal-selector-excluyente.component.css']
})
export class ModalSelectorExcluyenteComponent extends ModalComponenteFormulario implements OnInit {
  @ViewChild(TipoCampoFormularioVisibilidadComponent, { static: true }) override tipoCampoVisibilidad: TipoCampoFormularioVisibilidadComponent;
  @ViewChild('opcionesListaValores', { static: true }) opcionesListaValores: OpcionesCamposListaValoresComponent;
  grupoIterativo: string;
  override submitted = false;
  formGeneral: FormGroup = this.fb.group({
    nombre:new FormControl ({value:'',disabled:false},{validators:[Validators.required, Validators.maxLength(100)]}),
    etiqueta: new FormControl ({value:'',disabled:false},{validators:[Validators.required, Validators.maxLength(200)]}),
    descripcion: new FormControl ({value:'',disabled:false},{validators:[Validators.maxLength(800)]}),
    esSubsanable: new FormControl ({value:'',disabled:false}),
    esEditableOperador: new FormControl ({value:'',disabled:false}),
    seMuestraEnGrilla: new FormControl ({value:'',disabled:false}),
    valores: new FormControl ({value:'',disabled:false},{validators:[Validators.required]}),
    valoresPorDefecto: new FormControl ({value:'',disabled:false})
  });

  formValidaciones = this.fb.group({
    campoObligatorio: []
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
  get valores(){return this.formGeneral.get('valores')}

  getInstancia(): SelectorExcluyente {
    return new SelectorExcluyente();
  }

  ngOnInit() {
    this.formGeneral.get('valores').valueChanges.subscribe(
      valores => this.conceptosPagoComponent.actualizarOpcionesDisponibles(valores)
    );
    this.formGeneral.get('esSubsanable').valueChanges.subscribe(
      esSubsanable => this.conceptosPagoComponent.deshabilitarOHabilitarConceptosBasadoEnSubsanacion(esSubsanable)
    );
    this.formGeneral.get('esEditableOperador').valueChanges.subscribe(
      esEditableOperador => this.conceptosPagoComponent.deshabilitarOHabilitarConceptosBasadoEnEdicionOperador(esEditableOperador)
    );
    this.formGeneral.get('esEditableOperador').setValue(this.modelo.datosGenerales['esEditableOperador'] ? this.modelo.datosGenerales['esEditableOperador'] : false);
  }

  override initModal(tab: 'general' | 'validaciones' | 'visibilidad', modelo?: ModeloCampoFormulario) {
    super.initModal(tab, modelo);
    this.opcionesListaValores.incializarValoresPorDefecto(this.modelo['valoresPorDefecto']);
    this.conceptosPagoComponent.actualizarOpcionesDisponibles(this.modelo.datosGenerales['valores']);
  }

}
