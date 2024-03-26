import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariosComponent } from './formularios.component';
import { FormularioRoutingModule } from './formularios-routing.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { CreandoFormularioComponent } from './formularios/componentes/creando-formulario/creando-formulario.component';
import { CampoTextoInformativoComponent } from './formularios/tipos/texto-informativo/campo-texto-informativo/campo-texto-informativo.component';
import { TipoCampoFormularioVisibilidadComponent } from './formularios/componentes/tipo-campo-formulario-visibilidad/tipo-campo-formulario-visibilidad.component';
import { ModalTextoInformativoComponent } from './formularios/tipos/texto-informativo/modal-texto-informativo/modal-texto-informativo.component';
import { CampoTextoLargoComponent } from './formularios/tipos/texto/campo-texto-largo/campo-texto-largo.component';
import { ModalTextoLargoComponent } from './formularios/tipos/texto/modal-texto-largo/modal-texto-largo.component';
import { ModalTextoComponent } from './formularios/tipos/texto/modal-texto/modal-texto.component';
import { ModalTextoCortoComponent } from './formularios/tipos/texto/modal-texto-corto/modal-texto-corto.component';
import { CampoTextoComponent } from './formularios/tipos/texto/campo-texto/campo-texto.component';
import { CampoTelefonoComponent } from './formularios/tipos/telefono/campo-telefono/campo-telefono.component';
import { ModalTelefonoComponent } from './formularios/tipos/telefono/modal-telefono/modal-telefono.component';
import { CampoSelectorMultipleComponent } from './formularios/tipos/selector-multiple/campo-selector-multiple/campo-selector-multiple.component';
import { ModalSelectorMultipleComponent } from './formularios/tipos/selector-multiple/modal-selector-multiple/modal-selector-multiple.component';
import { CampoSelectorExcluyenteComponent } from './formularios/tipos/selector-excluyente/campo-selector-excluyente/campo-selector-excluyente.component';
import { ModalSelectorExcluyenteComponent } from './formularios/tipos/selector-excluyente/modal-selector-excluyente/modal-selector-excluyente.component';
import { ModalListaDesplegableSimpleComponent } from './formularios/tipos/lista-desplegable/modal-lista-desplegable-simple/modal-lista-desplegable-simple.component';
import { ModalListaDesplegableComponent } from './formularios/tipos/lista-desplegable/modal-lista-desplegable/modal-lista-desplegable.component';
import { ModalListaDesplegableConFiltroComponent } from './formularios/tipos/lista-desplegable/modal-lista-desplegable-con-filtro/modal-lista-desplegable-con-filtro.component';
import { CampoListaDesplegableComponent } from './formularios/tipos/lista-desplegable/campo-lista-desplegable/campo-lista-desplegable.component';
import { CampoGrupoIterativoComponent } from './formularios/tipos/grupo-iterativo/campo-grupo-iterativo/campo-grupo-iterativo.component';
import { ModalGrupoIterativoComponent } from './formularios/tipos/grupo-iterativo/modal-grupo-iterativo/modal-grupo-iterativo.component';
import { ModalFechaComponent } from './formularios/tipos/fecha/modal-fecha/modal-fecha.component';
import { CampoFechaComponent } from './formularios/tipos/fecha/campo-fecha/campo-fecha.component';
import { ModalDireccionUsigComponent } from './formularios/tipos/direccion-usig/modal-direccion-usig/modal-direccion-usig.component';
import { CampoDireccionUsigComponent } from './formularios/tipos/direccion-usig/campo-direccion-usig/campo-direccion-usig.component';
import { ModalDireccionCabaComponent } from './formularios/tipos/direccion-caba/modal-direccion-caba/modal-direccion-caba.component';
import { CampoDireccionCabaComponent } from './formularios/tipos/direccion-caba/campo-direccion-caba/campo-direccion-caba.component';
import { ModalCuitRazonsocialComponent } from './formularios/tipos/cuit-razonsocial/modal-cuit-razonsocial/modal-cuit-razonsocial.component';
import { ModalTipoCampoFormularioComponent } from './formularios/componentes/modal-tipo-campo-formulario/modal-tipo-campo-formulario.component';
import { CampoCuitRazonsocialComponent } from './formularios/tipos/cuit-razonsocial/campo-cuit-razonsocial/campo-cuit-razonsocial.component';
import { ModalArchivoComponent } from './formularios/tipos/archivo/modal-archivo/modal-archivo.component';
import { CampoArchivoComponent } from './formularios/tipos/archivo/campo-archivo/campo-archivo.component';
import { FiltrarDependenciasPipe } from './formularios/pipes/filtrar-dependencias.pipe';
import { CampoPlaceholderDirective } from './formularios/directivas/campo-placeholder.directive';
import { ComponenteDinamicoDirective } from './formularios/directivas/componente-dinamico.directive';
import { BarraComponentesComponent } from './formularios/componentes/barra-componentes/barra-componentes.component';
import { CampoFormularioComponent } from './formularios/componentes/campo-formulario/campo-formulario.component';
import { ContenedorBarraLateralComponent } from './formularios/componentes/contenedor-barra-lateral/contenedor-barra-lateral.component';
import { PrevisualizandoFormularioComponent } from './formularios/componentes/previsualizando-formulario/previsualizando-formulario.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ContenedorSeccionesFormularioComponent } from './formularios/componentes/contenedor-secciones-formulario/contenedor-secciones-formulario.component';
import { ControlesCampoFormularioComponent } from './formularios/componentes/controles-campo-formulario/controles-campo-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpcionesCamposListaValoresComponent } from './formularios/componentes/opciones-campos-lista-valores/opciones-campos-lista-valores.component';
import { FORMLY_CONFIG, FormlyModule } from '@ngx-formly/core';
import { SeccionFormularioComponent } from './formularios/componentes/seccion-formulario/seccion-formulario.component';
import { SeccionGrupoIterativoComponent } from './formularios/componentes/seccion-grupo-iterativo/seccion-grupo-iterativo.component';
import { SeccionModalCampoGrupoIterativoComponent } from './formularios/componentes/seccion-modal-campo-grupo-iterativo/seccion-modal-campo-grupo-iterativo.component';
import { TipoCampoFormularioItemConceptoComponent } from './formularios/componentes/tipo-campo-formulario-item-concepto/tipo-campo-formulario-item-concepto.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TipoCampoFormularioVisibilidadDeLosValoresComponent } from './formularios/componentes/tipo-campo-formulario-visibilidad-de-los-valores/tipo-campo-formulario-visibilidad-de-los-valores.component';
import { ValoresDependenciaCampoFormularioComponent } from './formularios/componentes/valores-dependencia-campo-formulario/valores-dependencia-campo-formulario.component';
import { BuscandoFormulariosComponent } from './formularios/componentes/buscando-formularios/buscando-formularios.component';
import { CuitRazonsocialComponent } from './formly/cuit-razonsocial/cuit-razonsocial.component';
import { DireccionCabaComponent } from './formly/direccion-caba/direccion-caba.component';
import { GrupoIterativoComponent } from './formly/grupo-iterativo/grupo-iterativo.component';
import { InputFechaComponent } from './formly/input-fecha/input-fecha.component';
import { InputSimpleComponent } from './formly/input-simple/input-simple.component';
import { InputTelefonoComponent } from './formly/input-telefono/input-telefono.component';
import { InputTextoInformativoComponent } from './formly/input-texto-informativo/input-texto-informativo.component';
import { InputTituloComponent } from './formly/input-titulo/input-titulo.component';
import { UploadFilesComponent } from './formly/upload-files/upload-files.component';
import { PrevisualizandoFormularioService } from './formularios/services/previsualizando-formulario.service';
import { LocalAndSesionStorageService } from './formularios/services/local-storage.service';
import { SelectComponent } from './formly/select/select.component';
import { SelectConFiltroComponent } from './formly/select-con-filtro/select-con-filtro.component';
import { SelectorExcluyenteComponent } from './formly/selector-excluyente/selector-excluyente.component';
import { SelectorMultipleComponent } from './formly/selector-multiple/selector-multiple.component';
import { SelectConDependenciaComponent } from './formly/select-con-dependencia/select-con-dependencia.component';
import { SelectorMultiplesComponent } from './formularios/componentes/selector-multiple/selector-multiple.component';
import { FormularioService } from './formularios/services/formulario.service';
import { ValidarFormularioFormlyService } from './formularios/services/validar-formulario-formly.service';
import { VisibilidadComponenteFormlyService } from './formularios/services/visibilidad-componente-formly.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TextboxSimpleComponent } from './formly/textbox-simple/textbox-simple.component';

import {
  InputFechaAnteriorAFechaDesdeValidador,
  InputFechaFueraDeRangoValidador,
  InputFechaPosteriorAFechaActual,
  InputFechaPosteriorAFechaHastaValidador,
} from './formly/input-fecha/input-fecha.validador';
import { Archivo } from './formularios/tipos/archivo/archivo';
import { ButtonFileUploaderComponent } from './formly/upload-files/button-file-uploader/button-file-uploader.component';
import { FileValueAccessor } from './formly/upload-files/file-value-accessor';
import { AlertasModule } from '../../components/alertas/alertas.module';
import { AutocompleterCalleComponent } from './formly/autocompleter-calle/autocompleter-calle.component';
import { AutocompleterCalleValidador } from './formly/autocompleter-calle/autocompleter-calle.validador';
import { FormularioResolve } from './formularios/formulario.resolve';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CamposRequeridosMibaService } from './formularios/services/campos-requeridos-miba.service';
import { TagInputModule } from 'ngx-chips';
import {
  InputCodigoHTMLNoValido,
  MaximoMensajeValidacion,
  MininimoMensajeValidacion,
} from './formly/input-simple/input-simple.mensaje-validacion';
import { mensajesValidaciones } from './formularios/modelos/mensajes-validaciones';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormlyBootstrapModule,
  FormlyWrapperFormField,
} from '@ngx-formly/bootstrap';
import { ModalsModule } from '@components/modals/modals.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [
    FormulariosComponent,
    CreandoFormularioComponent,
    CampoTextoInformativoComponent,
    TipoCampoFormularioVisibilidadComponent,
    ModalTextoInformativoComponent,
    CampoTextoLargoComponent,
    ModalTextoLargoComponent,
    ModalTextoComponent,
    ModalTextoCortoComponent,
    CampoTextoComponent,
    CampoTelefonoComponent,
    ModalTelefonoComponent,
    CampoSelectorMultipleComponent,
    ModalSelectorMultipleComponent,
    CampoSelectorExcluyenteComponent,
    ModalSelectorExcluyenteComponent,
    ModalListaDesplegableSimpleComponent,
    ModalListaDesplegableComponent,
    ModalListaDesplegableConFiltroComponent,
    CampoListaDesplegableComponent,
    CampoGrupoIterativoComponent,
    ModalGrupoIterativoComponent,
    ModalFechaComponent,
    CampoFechaComponent,
    ModalDireccionUsigComponent,
    CampoDireccionUsigComponent,
    ModalDireccionCabaComponent,
    CampoDireccionCabaComponent,
    ModalCuitRazonsocialComponent,
    ModalTipoCampoFormularioComponent,
    CampoCuitRazonsocialComponent,
    ModalArchivoComponent,
    CampoArchivoComponent,
    ModalTextoInformativoComponent,
    FiltrarDependenciasPipe,
    CampoPlaceholderDirective,
    ComponenteDinamicoDirective,
    BarraComponentesComponent,
    CampoFormularioComponent,
    ContenedorBarraLateralComponent,
    PrevisualizandoFormularioComponent,
    ContenedorSeccionesFormularioComponent,
    ControlesCampoFormularioComponent,
    OpcionesCamposListaValoresComponent,
    SeccionFormularioComponent,
    SeccionGrupoIterativoComponent,
    SeccionModalCampoGrupoIterativoComponent,
    SelectorMultipleComponent,
    TipoCampoFormularioItemConceptoComponent,
    TipoCampoFormularioVisibilidadDeLosValoresComponent,
    ValoresDependenciaCampoFormularioComponent,
    BuscandoFormulariosComponent,
    CuitRazonsocialComponent,
    DireccionCabaComponent,
    GrupoIterativoComponent,
    InputFechaComponent,
    InputSimpleComponent,
    InputTelefonoComponent,
    InputTextoInformativoComponent,
    InputTituloComponent,
    UploadFilesComponent,
    SelectComponent,
    SelectConFiltroComponent,
    SelectorExcluyenteComponent,
    SelectConDependenciaComponent,
    SelectorMultiplesComponent,
    TextboxSimpleComponent,
    ButtonFileUploaderComponent,
    FileValueAccessor,
    ModalListaDesplegableComponent,
    AutocompleterCalleComponent,
  ],
  exports: [PrevisualizandoFormularioComponent],
  imports: [
    ModalsModule,
    CommonModule,
    MatFormFieldModule,
    FormularioRoutingModule,
    PaginationModule,
    MatStepperModule,
    FormsModule,
    PopoverModule.forRoot(),
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    NgSelectModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'input-titulo',
          component: InputTituloComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'input-texto-informativo',
          component: InputTextoInformativoComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'input-simple',
          component: InputSimpleComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'textbox-simple',
          component: TextboxSimpleComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'input-radio',
          component: SelectorExcluyenteComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'selector-multiple',
          component: SelectorMultipleComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'input-select',
          component: SelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'select-con-filtro',
          component: SelectConFiltroComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'select-con-dependencia',
          component: SelectConDependenciaComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'input-telefono',
          component: InputTelefonoComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'cuit-razonsocial',
          component: CuitRazonsocialComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'direccion-usig',
          component: AutocompleterCalleComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'input-fecha',
          component: InputFechaComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'input-file',
          component: UploadFilesComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'grupo-iterativo',
          component: GrupoIterativoComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'direccion-caba',
          component: DireccionCabaComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'calle-usig',
          component: AutocompleterCalleComponent,
          wrappers: ['form-field'],
        },
      ],
      validators: [
        {
          name: 'fecha-anterior-fecha-desde',
          validation: InputFechaAnteriorAFechaDesdeValidador,
        },
        {
          name: 'fecha-posterior-fecha-hasta',
          validation: InputFechaPosteriorAFechaHastaValidador,
        },
        {
          name: 'fecha-posterior-fecha-actual',
          validation: InputFechaPosteriorAFechaActual,
        },
        {
          name: 'fecha-fuera-de-rango',
          validation: InputFechaFueraDeRangoValidador,
        },
        {
          name: 'calle-usig',
          validation: AutocompleterCalleValidador,
        },
      ],
    }),
    ReactiveFormsModule,
    AlertasModule,
    TagInputModule,
    SearchModule,
  ],
  providers: [
    PrevisualizandoFormularioService,
    LocalAndSesionStorageService,
    FormularioService,
    ValidarFormularioFormlyService,
    CamposRequeridosMibaService,
    PrevisualizandoFormularioService,
    VisibilidadComponenteFormlyService,
    FormularioResolve,
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: mensajesValidaciones,
    },
  ],
})
export class FormulariosModule {}
