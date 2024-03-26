import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import {
  minLengthArray,
  minSelectedCheckboxes,
  validateStatus,
} from '@utils/validation';
import { InscripcionesService } from '../inscripciones.service';

import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';

import { daysList, Formulario, Organismos } from '../interfaces';
import { Location } from '@angular/common';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public formIsSubmitted: boolean = false;
  public showAlert: boolean = false;
  public statusAlert: string = ''; // alert-danger; alert-success
  public messageAlert: string = '';

  public element: any;
  public formInscripciones;
  public formInstancias;
  public formInstSedes;
  public formInstanciasFormulario;
  public listaDeInscripciones: Array<any> = [];
  public activeStep: number = 1;
  public stepIsActive: boolean = true;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';
  public modalSwitch: boolean = false;
  public modalFormInstanciaSede = false;
  public modalForms = false;
  public instActive = null;
  public listaOrganismos: Array<Organismos> = [];
  public listForms: Array<Formulario> = [];

  public isEditMode: boolean = false;
  // private regExUrl: string =
  //   '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  private regExUrl =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  private regExName: RegExp = /^\S.*\S$/;

  @ViewChild(StepOneComponent) formOne;
  @ViewChild(StepTwoComponent) formTwo;
  @ViewChild(StepThreeComponent) formThree;

  constructor(
    private ruteForm: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private inscripcionesService: InscripcionesService,
    private sharedService: SharedService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getFaoms();
    this.initialForm();
    this.initInstanciaSedes();
    this.onChanges();
  }

  ngOnChanges(): void {}

  setDataOrganismo(data: Array<Organismos>) {
    this.listaOrganismos = data;
  }

  ngOnDestroy(): void {
    this.inscripcionesService.clearDataSource();
  }

  onChanges(): void {
    this.formInscripciones.valueChanges.subscribe(() => {});
  }

  get categoriaFormControl(): FormControl {
    return this.formInscripciones.controls.categoria as FormControl;
  }

  getFaoms(): void {
    this.sharedService.getFormularios().subscribe((data) => {
      this.listForms = data;
    });
  }

  getDataEdit(): void {
    let id = this.ruteForm.snapshot.params['id'];
    this.isEditMode = !!id;
    if (this.isEditMode) {
      this.inscripcionesService.getDataEdit(id).subscribe((data) => {
        if (data) {
          this.formInscripciones.patchValue(data);

          data.instancias.forEach((ins, index) => {
            this.formTwo.addInstaciasForm(ins, true);
            ins.instanciaSedes.forEach((sede, i) => {
              this.formTwo.addSedeInstancia(sede, index);
            });
          });

          data.formularioInscripcion.forEach((formulario) => {
            this.formThree.filterListForm(
              formulario.formulario,
              formulario.dirigido
            );
          });

          this.inscripcionesService.addFormulario(
            data.formularioInscripcion,
            this.formInscripciones,
            this.formBuilder
          );

          this.getOrganismoCategoria(data.organismo);
          this.categoriaFormControl.enable();
        }
      });
    }
  }

  getOrganismoCategoria(organismo) {
    const dataOrganismo = this.listaOrganismos.filter(
      (el) => el.id === organismo
    );
    this.formOne.setDataOptionSelected(dataOrganismo);
    this.formOne.getCategoriaById(organismo);
  }

  closeTootip(el): void {
    setTimeout(() => {
      el.click();
    }, 1000);
  }

  initialForm() {
    this.formInscripciones = this.formBuilder.group({
      id: [],
      feriado: [0, [Validators.required]],
      cuposParaOtros: [0, [Validators.required]],
      cuposGrupales: [0, [Validators.required]],
      loginMiba: [0, [Validators.required]],
      cantidadMaxima: ['', [Validators.required, Validators.min(1)]],
      nombre: ['', [Validators.pattern(this.regExName), Validators.required]],
      url: [{ value: '', disabled: true }],
      retornoUrl: [
        '',
        [Validators.pattern(this.regExUrl), Validators.required],
      ],
      organismoCategoria: ['', [Validators.required]],
      organismo: ['', [Validators.required]],
      categoria: [{ value: '', disabled: true }, [Validators.required]],
      correo: ['', [Validators.required]],
      notificacion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      estado: [1],
      estadoInscripcion: [0],
      instancias: this.formBuilder.array([]),
      formularioInscripcion: this.formBuilder.array([]),
    });
    this.prepareFormInstancias();
    this.prepareFormulario();
  }

  prepareFormInstancias() {
    this.formInstancias = this.formBuilder.group({
      modalidad: ['', [Validators.required]],
      modalidadName: [''],
      vigenciaInicio: ['', [Validators.required]],
      vigenciaFin: ['', [Validators.required]],
      limiteInscripcion: [, [Validators.required, Validators.min(0)]],
      duracionSemana: [, [Validators.required, Validators.min(1)]],
      codigo: [' - '],
      nombre: [''],
      instanciaSedes: this.formBuilder.array([], Validators.minLength(1)),
      estado: 1,
      bloqueado: 0,
      id: null,
    });
  }

  prepareFormulario() {
    this.formInstanciasFormulario = this.formBuilder.group({
      id: [null],
      estado: [1],
      dirigido: [''],
      incripcion: [null],
      formulario: ['', Validators.required],
    });
  }

  get DaysFormArray() {
    return this.formInstSedes.controls.dias as FormArray;
  }

  initInstanciaSedes() {
    this.formInstSedes = this.formBuilder.group({
      id: [null],
      sede: [''],
      urlSede: ['', [Validators.pattern(this.regExUrl)]],
      cupos: ['', [Validators.required, Validators.min(1)]],
      dias: new FormArray([], minSelectedCheckboxes(1)),
      // horaInicio: ['10:00:00', [Validators.required]],
      // horaFin: ['12:00:00', [Validators.required]],
      vigenciaInicio: [''],
      vigenciaFin: [''],
      claseDTOList: new FormArray([]),
      claseHorarios: new FormArray([]),
    });
    // this.addDays();
  }

  public addDays(days?) {
    const dataDays = days ? days : daysList.slice();
    dataDays.forEach((item) => this.DaysFormArray.push(new FormControl(item)));
  }

  resetFormInstancias() {
    this.prepareFormInstancias();
  }

  closeModal($event?) {
    this.modalSwitch = false;
  }

  openModal($event?) {
    this.modalSwitch = true;
  }

  changeStatusModalInstSede(index: any = null) {
    this.modalFormInstanciaSede = !this.modalFormInstanciaSede;
    this.instActive = index;
  }

  changeStatusModalForms(submit: boolean = false) {
    this.modalForms = !this.modalForms;
    if (submit) this.formThree.addForm();
  }

  redirectToPage() {
    this._location.back();
  }

  public toggleDatePicker(datePicker: any): void {
    datePicker.toggle();
    if (datePicker.isOpen()) {
      this.ngZone.onStable
        .asObservable()
        .pipe(take(1))
        .subscribe(() => {
          const elementToFocus = datePicker._elRef.nativeElement;
          if (elementToFocus) {
            elementToFocus.focus();
          }
        });
    }
  }

  sendformInscripcion(): void {
    this.formIsSubmitted = true;
    this.listaDeInscripciones = this.formInscripciones.value;
    if (this.isEditMode) {
      this.inscripcionesService
        .putInscripciones(this.formInscripciones.value)
        .subscribe(
          (response) => {
            this.onShowAlert(
              'alert-success',
              'Inscripción modificada exitosamente'
            );

            setTimeout(() => {
              this.redirectToPage();
            }, 2000);
          },
          (error) => {
            this.onShowAlert('alert-danger', 'Error al editar la inscripción');
          }
        );
    } else {
      this.inscripcionesService
        .postInscripciones(this.formInscripciones.value)
        .subscribe(
          (data) => {
            this.onShowAlert(
              'alert-success',
              'Inscripción creada exitosamente'
            );
            setTimeout(() => {
              this.redirectToPage();
            }, 2000);
          },
          (error) => {
            this.onShowAlert(
              'alert-danger',

              'Error al crear la inscripción'
            );
          }
        );
    }
  }

  onShowAlert(status: string, message: string) {
    this.statusAlert = status;
    this.messageAlert = message;
    this.showAlert = true;
    this.formIsSubmitted = false;
  }

  //STEPPER FUNCTIONS
  changeStep() {
    this.activeStep = this.activeStep + 1;
    this.stepIsActive = true;
    this.showAlert = false;

    if (this.activeStep <= 2) {
      this.formInscripciones.controls['instancias'].addValidators([
        minLengthArray(1),
      ]);
      this.formInscripciones.controls['instancias'].updateValueAndValidity();

      this.formInscripciones.controls['formularioInscripcion'].addValidators([
        minLengthArray(1),
      ]);
      this.formInscripciones.controls[
        'formularioInscripcion'
      ].updateValueAndValidity();
    }
    if (this.activeStep <= 2 && this.isEditMode) {
      this.formInscripciones.controls['instancias'].addValidators([
        validateStatus(),
      ]);
      this.formInscripciones.controls['instancias'].updateValueAndValidity();
    }
  }

  stepDown() {
    this.activeStep = this.activeStep - 1;
    this.stepIsActive = true;
    if (this.activeStep === 1) {
      this.formInscripciones.controls['instancias'].clearValidators([
        minLengthArray(1),
      ]);

      this.formInscripciones.controls['formularioInscripcion'].clearValidators([
        minLengthArray(1),
      ]);
      this.formInscripciones.controls['instancias'].updateValueAndValidity();
      this.formInscripciones.controls[
        'formularioInscripcion'
      ].updateValueAndValidity();
    }
  }

  closeAlert() {
    this.showAlert = false;
  }
}
