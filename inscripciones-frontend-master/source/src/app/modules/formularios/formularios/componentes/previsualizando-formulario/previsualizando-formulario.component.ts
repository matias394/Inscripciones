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
  ChangeDetectorRef,
} from '@angular/core';
import { PrevisualizandoFormularioService } from '../../services/previsualizando-formulario.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LocalAndSesionStorageService } from '../../services/local-storage.service';
import { PrevisualizarFormulario } from '../../modelos/previsualizar-formulario';
import { ValidarFormularioFormlyService } from '../../services/validar-formulario-formly.service';
import { TokenStorageService } from '../../../../auth/token-storage.service';
import { PerfilMIBA } from '../../modelos/perfil-miba';
import { FormulariosService2 } from '@shared/services/formularios.service';

declare var $: any;

@Component({
  selector: 'app-previsualizando-formulario',
  templateUrl: './previsualizando-formulario.component.html',
  styleUrls: ['./previsualizando-formulario.component.css'],
})
export class PrevisualizandoFormularioComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: MatStepper;
  @Input() formId: { title: string };
  @Input() activeStep: number;
  @Input() preloadedResponse?: any;
  @Input() gestionInscripto?: boolean;
  // @ts-ignore
  @Output() saveFormResult = new EventEmitter<any>();

  seccionActual = 0;
  corregirErrores: boolean = false;
  token: string;
  nombre: string;
  secciones: {
    fields: FormlyFieldConfig[];
  }[];

  form: FormArray;
  previewOnly: Boolean = true;
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
    private validarFormularioFormlyService: ValidarFormularioFormlyService,
    private formulariosService: FormulariosService2,
    private tokenService: TokenStorageService,
    private cdRef: ChangeDetectorRef
  ) {
    this.JSON = JSON;
  }

  ngOnInit() {
    if (this.preloadedResponse) {
      this.previewOnly = false;
      this.model = this.preloadedResponse;
    }

    if (this.gestionInscripto) {
      this.previewOnly = false;
    }

    const perfilMiba = JSON.stringify(PERFIL_MIBA_PREVISUALIZACION);
    this.localAndSesionStorageService.setElement(
      this.localAndSesionStorageService.PROFILE_MIBA,
      perfilMiba
    );

    const data = {
      formId: this.formId,
      // formId: '63ee2cbc51e8505c2057bb29'
    };

    this.formulariosService.getFormById(data.formId).subscribe({
      next: (data) => {
        data.secciones = JSON.parse(data.campos.replace("{'", '{"'));
        this.iniciarFormulario(data);
      },
      error: (err) => {
        console.log('err :>> ', err);
      },
    });

    this.previsualizandoFormularioService.setVentanaAbierta(true);

    // detectamos los cambios en el formulario
    this.previsualizandoFormularioService.formulario$
      .pipe
      //takeUntil(this.destroyed$)
      ()
      .subscribe((form) => {
        this.iniciarFormulario(form);
      });

    // obtenemos las secciones
    const formulario = this.previsualizandoFormularioService.getFormulario();
    this.iniciarFormulario(formulario);
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
      window.scroll(0, $('formly-validation-message')[0].offsetTop);
      this.corregirErrores = false;
    }
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.cerrarVentana();
  }

  iniciarFormulario(formulario: PrevisualizarFormulario) {
    this.nombre = formulario.nombre;
    this.secciones = formulario.secciones;
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
    window.close();
  }

  finalizarPrevisualizacion() {
    window.close()
  }

  isFormValid(): boolean {
    if (
      !this.validarFormulario(
        this.form.controls[this.seccionActual] as FormGroup,
        this.secciones[this.seccionActual].fields
      )
    ) {
      this.corregirErrores = true;
      this.markAsTouched(this.form.controls[this.seccionActual] as FormGroup);
      return false;
    } else {
      this.corregirErrores = false;
      return true;
    }
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
      $('#buttonStep2').prop('disabled', false);
    }
    return this.seccionActual !== this.secciones.length - 1;
  }

  @HostListener('window:beforeunload', ['$event']) beforeunloadHandler(event) {
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
    this.saveFormResult.emit(model);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeStep'] && changes['activeStep']?.currentValue === 3) {
      // if (!this.corregirErrores && !this.esPosibleAvanzarSeccion()) {
      this.onSubmit(this.model);
      // }
    }
  }
}
