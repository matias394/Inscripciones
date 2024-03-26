//import { InfraccionesService } from './../../../../shared/service/infracciones.service';
//import { GRUPO_INFRACCIONES_PREVISUALIZACION } from './../../modelos/grupo-infracciones-previsualizacion';
//import { AuthService } from './../../../../auth/services/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { PERFIL_MIBA_PREVISUALIZACION } from './../../modelos/perfil-miba-previsualizacion';
import {
  AfterViewChecked,
  EventEmitter,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PrevisualizandoFormularioService } from '../../services/previsualizando-formulario.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LocalAndSesionStorageService } from '../../services/local-storage.service';
import { PrevisualizarFormulario } from '../../modelos/previsualizar-formulario';
import { ValidarFormularioFormlyService } from '../../services/validar-formulario-formly.service';
import { TokenStorageService } from '../../../../auth/token-storage.service';
import { PerfilMIBA } from '../../modelos/perfil-miba';
import { FormulariosService } from 'src/app/shared/services/formularios.service';

declare var $: any;

@Component({
  selector: 'app-previsualizando-formulario',
  templateUrl: './previsualizando-formulario.component.html',
  styleUrls: ['./previsualizando-formulario.component.css'],
})
export class PrevisualizandoFormularioComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  @ViewChild('stepper') stepper: MatStepper;
  @Input() formId: { title: string };
  @Input() activeStep: number;
  @Input() inscripcionId: number;
  // @ts-ignore
  @Output() saveFormResult = new EventEmitter<any>();

  seccionActual = 0;
  corregirErrores: boolean;
  token: string;
  nombre: string;
  secciones: {
    fields: FormlyFieldConfig[];
  }[];

  form: FormArray;
  options: any[];
  model: any = {};
  JSON: any;
  // @ts-ignore
  MibaMode: PerfilMIBA = {
    first_name: '',
    last_name: '',
    document_nationality: '',
    document_number: 0,
    gender: '',
    birthday: '1981-05-02',
    province: 'Ciudad de Buenos Aires',
    location: 'Agronomía',
    address: 'DEL LIBERTADOR AV. 8000',
    floor: 'PB',
    department: '2',
    postal_code: '2312',
    code_phone: '',
    area_code_phone: '',
    phone: '',
    code_cellphone: '',
    area_code_cellphone: '',
    cellphone: '',
    cuil: 0,
    alternative_email: '',
    nationality: '',
    document_type: '',
    document_nationality_code: 'ARG',
  };

  constructor(
    private localAndSesionStorageService: LocalAndSesionStorageService,
    private previsualizandoFormularioService: PrevisualizandoFormularioService,
    //private authService: AuthService,
    //private infraccionesService: InfraccionesService,
    private validarFormularioFormlyService: ValidarFormularioFormlyService,
    private formulariosService: FormulariosService,
    private tokenService: TokenStorageService
  ) {
    //super();

    this.JSON = JSON;
  }

  ngOnInit() {
    this.token = this.tokenService.getJwtToken();
    this.corregirErrores = false;
    //this.authService.mostrarNavBar = false;

    // guardamos los datos del perfil miba

    let dataUser = this.tokenService.getUserInformation();
    if (dataUser) {
      this.llenarMiba(dataUser);
      const perfilMiba = JSON.stringify(this.MibaMode);
      this.localAndSesionStorageService.setElement(
        this.localAndSesionStorageService.PROFILE_MIBA,
        perfilMiba
      );
    } else {
      const perfilMiba = JSON.stringify(PERFIL_MIBA_PREVISUALIZACION);
      this.localAndSesionStorageService.setElement(
        this.localAndSesionStorageService.PROFILE_MIBA,
        perfilMiba
      );
    }

    //this.infraccionesService.guardarGrupoInfracciones(GRUPO_INFRACCIONES_PREVISUALIZACION);

    // seteamos la ventana abierta para que no abra otra al previsualizar
    // this.previsualizandoFormularioService.setVentanaAbierta(true);

    // // detectamos los cambios en el formulario
    // this.previsualizandoFormularioService.formulario$.pipe(
    //   //takeUntil(this.destroyed$)
    // ).subscribe(
    //   (form) => {
    //     this.iniciarFormulario(form);
    //   }
    // );

    // // obtenemos las secciones
    // const formulario = this.previsualizandoFormularioService.getFormulario();
    // this.iniciarFormulario(formulario);

    const data = {
      formId: this.formId,
    };

    this.formulariosService.fetchFormulario(data, this.token).subscribe({

      next: (data) => {
        // .replace colocado para que no rompa, ya que desde el back viene con el formato: [{'xxxx"}]
        data.secciones = JSON.parse(data.campos.replace("{'", '{"'));
        this.iniciarFormulario(data);

      },
      error: (err) => {
        // testing hardcoded form
        // let info = {"nombre":"test","secciones":[{"fields":[{"key":"test","type":"input-file","name":"test","subsanable":false,"editableOperador":false,"templateOptions":{"label":"test","required":false,"archivoNuevo":false,"descripcion":"","mensajeError":"","seMuestraEnGrilla":""}}]}]}
        // this.iniciarFormulario(info)
        console.log('err :>> ', err);
      },
    });
  }

  llenarMiba(data) {
    // console.log('llenarMIba');
    // console.log(data);
    this.MibaMode.first_name = data.nombre;
    this.MibaMode.last_name = data.apellido;
    this.MibaMode.cuil = data.cuil;
    this.MibaMode.nationality = data.nacionalidad;
    this.MibaMode.document_number = data.dni;
    this.MibaMode.gender = data.genero;
    this.MibaMode.alternative_email = data.email;
    this.MibaMode.document_type = data.documentType;

    const telefono = JSON.parse(data.telefono);
    telefono.forEach((resultado) => {
      if (resultado.phone_type == 'Celular') {
        this.MibaMode.cellphone = resultado.phone_number;
        this.MibaMode.code_cellphone = resultado.country_code;
        this.MibaMode.area_code_cellphone = resultado.area_code;
      } else if (resultado.phone_type == 'Fijo') {
        this.MibaMode.phone = resultado.phone_number;
        this.MibaMode.code_phone = resultado.country_code;
        this.MibaMode.area_code_phone = resultado.area_code;
      } else {
        this.MibaMode.phone = resultado.phone_number;
        this.MibaMode.code_phone = resultado.country_code;
        this.MibaMode.area_code_phone = resultado.area_code;
      }
    });
  }

  ngAfterViewChecked() {
    if ($('small.form-text.text-muted.ng-star-inserted')) {
      const small = $('small.form-text.text-muted.ng-star-inserted');
      for (let i = 0; i < small.length; i++) {
        small[i].hidden = true;
      }
    }
    if (this.corregirErrores) {
      $('.ng-invalid:first').focus();
      // window.scroll(0, $('formly-validation-message')[0].offsetTop);
      this.corregirErrores = false;
    }
  }

  ngOnDestroy() {
    //super.ngOnDestroy();
    this.cerrarVentana();
  }

  iniciarFormulario(formulario: PrevisualizarFormulario) {
    this.nombre = formulario.nombre;
    this.secciones = formulario.secciones;
    // inicializamos el formulario
    // this.model = {};
    this.form = new FormArray(this.secciones.map(() => new FormGroup({})));
    this.options = this.secciones.map(
      () =>
        <FormlyFormOptions>{
          formState: {
            formModel: this.model,
          },
        }
    );
  }

  getContenidoSeccionActual(): FormlyFieldConfig[] {
    if (this.secciones == null) {
      return [];
    }
    return this.secciones[this.seccionActual].fields;
  }

  validarFormulario(
    formGroup: FormGroup,
    fields: FormlyFieldConfig[]
  ): boolean {
    return this.validarFormularioFormlyService.validar(formGroup, fields);
  }

  cerrarVentana() {
    this.previsualizandoFormularioService.setVentanaAbierta(false);
    //this.authService.mostrarNavBar = true;

    window.close();
  }

  finalizarPrevisualizacion() {
    // if (!this.validarFormulario(this.form.controls[this.seccionActual] as FormGroup, this.secciones[this.seccionActual].fields)) {
    //   this.corregirErrores = true;
    //   this.markAsTouched(this.form.controls[this.seccionActual] as FormGroup);
    // } else {
    //   this.corregirErrores = false;
    //   this.cerrarVentana();
    // }
  }

  siguienteSeccion() {
    if (!this.esPosibleAvanzarSeccion()) {
      return;
    }

    if (
      !this.validarFormulario(
        this.form.controls[this.seccionActual] as FormGroup,
        this.secciones[this.seccionActual].fields
      )
    ) {
      this.corregirErrores = true;
      this.markAsTouched(this.form.controls[this.seccionActual] as FormGroup);
    } else {
      this.corregirErrores = false;
      this.seccionActual++;
      this.stepper.next();
      this.irAlPrimerControl();
    }
  }

  seccionPrevia() {
    if (!this.esPosibleRetrocederSeccion()) {
      return;
    }
    this.seccionActual--;
  }

  esPosibleRetrocederSeccion(): boolean {
    return this.seccionActual !== 0;
  }

  esPosibleAvanzarSeccion(): boolean {
    if (this.seccionActual !== this.secciones.length - 1) {
      $('#buttonStep2').prop('disabled', true);
    } else {
      if (
        !this.validarFormulario(
          this.form.controls[this.seccionActual] as FormGroup,
          this.secciones[this.seccionActual].fields
        )
      ) {
        $('#buttonStep2').prop('disabled', true);
      } else {
        $('#buttonStep2').prop('disabled', false);
      }
    }
    return this.seccionActual !== this.secciones.length - 1;
  }

  @HostListener('window:beforeunload', ['$event']) beforeunloadHandler(event) {
    // capturamos el evento al cerrar la ventana, seteamos la ventana abierta en false para que
    // si queremos previsualizar abra de nuevo la ventana
    this.cerrarVentana();
  }

  private irAlPrimerControl() {
    window.scroll(
      0,
      $('form').find('*').filter(':input:visible:first')[0].offsetTop
    );
  }

  private markAsTouched(group: FormGroup | FormArray) {
    group.markAsTouched({ onlySelf: true });
    Object.keys(group.controls).map((field) => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    });
  }

  onSubmit(model: any) {
    // console.log(model);

    // console.log('this.form :>> ', this.form);

    // console.log('this.model :>> ', this.model);

    // console.log('this.options :>> ', this.options);

    // console.log('this.secciones :>> ', this.secciones);

    // console.log('this.form.controls :>> ', this.form.controls);

    this.saveFormResult.emit(model);
    // this.saveFormResult.emit(model);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeStep'] && changes['activeStep']?.currentValue === 2) {
      this.onSubmit(this.model);
    }
  }
}
