import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComunicacionBarraSeccionesService } from './../../services/comunicacion-barra-secciones.service';
// import { ComponenteValidableComponent } from 'src/app/shared/componentes/componente-validable/componente-validable.component';
import { CampoFormulario } from '../../modelos/campo-formulario';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';


@Component({
  selector: 'app-tipo-campo-formulario-visibilidad',
  templateUrl: './tipo-campo-formulario-visibilidad.component.html',
  styleUrls: ['./tipo-campo-formulario-visibilidad.component.css']
})
export class TipoCampoFormularioVisibilidadComponent implements OnInit {
  @Input() modoEdicion: boolean;
  @Input() tieneConceptosDePagoAsociados: boolean;

  listaDependencias = [];
  listaValores = [];


  form = this.formBuilder.group({
    dependencia: [],
    valores: [null, Validators.required]
  });

  tieneConceptoPagoYComponenteAsociadoSubsanable = false;

  constructor(
    private formBuilder: FormBuilder,
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService) {
    //super();
  }

  ngOnInit() {
    this.inicializarValidaciones();
    setTimeout(() => {
      // lo ponemos dentro de un timeout para que se actualice la clave actual en el servicio
      this.setDependenciasVisibilidad();
    });
  }

  inicializarValidaciones(): void {
/*    this.validaciones = {
      nombre: { invalido: false, mensaje: '' },
      valores: { invalido: false, mensaje: '' }
    };*/
  }

  actualizarValidaciones(): void {
    if (this.dependencias) {
      this.form.controls['valores'].setValidators(Validators.required);
      this.form.controls['valores'].updateValueAndValidity();
      //this.validar('valores', ['required']);
    } else {
      this.form.controls['valores'].setValidators(null);
      this.form.controls['valores'].updateValueAndValidity();
    }
  }

  setDependenciasVisibilidad() {
    const camposCreados = this.comunicacionBarraSeccionesService.campos;
    const claveActual = this.comunicacionBarraSeccionesService.claveActual;
    const listaDependencias = [];
    for (const clave in camposCreados) {
      if (camposCreados.hasOwnProperty(clave) && (!this.modoEdicion || claveActual !== clave)) {
        // salteamos la clave actual para que el campo no pueda depender de si mismo
        if (this.seleccionableComoDependencia(camposCreados[clave])) {
          const modelo: ModeloCampoFormulario = camposCreados[clave].modelo;
          listaDependencias.push({
            tipo: modelo.tipo,
            key: clave,
            nombre: modelo.datosGenerales['nombre'],
            valores: modelo.datosGenerales['valores'] || []
          });
        }
      }
    }
    this.listaDependencias = listaDependencias;
  }

  noSeAgregaAListaDependencias(componenteSeleccionadoActual: ModeloCampoFormulario, componenteIteracion: ModeloCampoFormulario): boolean {
    // La primer condicion es true si el componente actual no pertenece a un grupo iterativo y el componente de la iteracion si
    // La segunda condicion es true si el componente actual pertenece a un grupo iterativo pero el componente de la iteracion pertenece a otro
    return (!componenteSeleccionadoActual.grupoIterativo && componenteIteracion.grupoIterativo !== null)
      || (componenteSeleccionadoActual.grupoIterativo && (!componenteIteracion.grupoIterativo || componenteSeleccionadoActual.grupoIterativo.key !== componenteIteracion.grupoIterativo.key));
  }

  patchFormValue(visibilidad: any) {
    if (visibilidad == null || visibilidad.dependencia == null) { return; }

    setTimeout(() => {
      this.setDependenciasVisibilidad();

      const campo = this.comunicacionBarraSeccionesService.campos[visibilidad.dependencia];
      if (!campo) {
        return;
      }
      const _visibilidad = Object.assign({}, visibilidad, {
        dependencia: this.listaDependencias.find(ld => ld.nombre === campo.modelo.datosGenerales['nombre'])
      });
      this.form.patchValue(_visibilidad);
    });
  }

  get obtenerVisibilidad() {
    const value = this.form.value;

    if (typeof (value.dependencia) === 'object' && value.dependencia) {
      value.dependencia = value.dependencia.key;
    }
    return value;
  }

  get dependencias() {
    return this.form.get('dependencia').value;
  }

  seleccionableComoDependencia(campo: CampoFormulario): boolean {
    const { modelo: { tipo } } = campo;
    return tipo === 'listaDesplegable' ||
      tipo === 'listaDesplegableFiltro' ||
      tipo === 'selectorExcluyente' ||
      tipo === 'selectorMultiple' ||
      tipo === 'acordeon';
  }

  changeDependencia() {
    this.form.controls['valores'].setValue(null);
    this.tieneConceptoPagoYComponenteAsociadoSubsanable = false;
  }

  isValid(): boolean {
    if (!this.form) {
      return true;
    }
    return this.form.valid && this.validarDependenciaComponente();
  }

  validarDependenciaComponente(): boolean {
    const formValue = this.form.value;
    if (!formValue || !formValue.dependencia) {
      return true;
    }
    const claveDependencia = formValue.dependencia.key;
    const campoSubsanable = this.comunicacionBarraSeccionesService.esCampoSubsanable(claveDependencia);
    this.tieneConceptoPagoYComponenteAsociadoSubsanable = campoSubsanable;
    return !this.tieneConceptoPagoYComponenteAsociadoSubsanable;
  }
}
