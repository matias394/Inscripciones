import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { SharedService } from '@shared/services/shared.service';
import { InscripcionesService } from '../../../inscripciones.service';
import {
  Formulario,
  formularioInscripcionDto,
  Formularios,
} from '../../../interfaces';

interface Option {
  id: string;
  nombre: string;
}

@Component({
  selector: 'form-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
})
export class StepThreeComponent implements OnInit {
  @Input() form;
  @Input() myForm;
  @Input() isEditMode;
  @Input() formIsSubmitted;
  @Output() eventModalForms = new EventEmitter();
  @Output() eventModalCancel = new EventEmitter();
  @Output() eventChangeStep = new EventEmitter();
  @Output() eventStepDown = new EventEmitter();
  @Output() eventSubmit = new EventEmitter();
  @Input() listaFormularios: Array<Formularios>;

  public listaFormSubmit: Array<Formulario> = [];
  public formSelected: Option = { id: '', nombre: '' };
  formSelect$ = new Subject<string>();

  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private inscripcionesService: InscripcionesService
  ) {}

  ngOnInit(): void {
    this.formularioSeleccionado();
  }

  ngOnChanges(): void {
    this.myForm.valueChanges.subscribe(() => {
      // console.log(this.myForm);
    });
  }

  resetMyForm(): void {
    this.myForm = {
      formulario: null,
      dirigido: null,
      id: null,
      incripcion: null,
      estado: 1,
    };
  }

  openModalCancel(): void {
    this.eventModalCancel.emit();
  }

  stepDown(): void {
    this.eventStepDown.emit();
  }

  changeStep(): void {
    this.eventChangeStep.emit();
  }

  async formularioSeleccionado() {
    this.formSelect$.subscribe((event) => {
      this.myForm.patchValue({ formulario: event });
      this.eventModalForms.emit();
    });
  }

  addForm() {
    const formValues = this.myForm.getRawValue();
    console.log(formValues);
    // this.clearFormArray();
    this.filterListForm(formValues.formulario, formValues.dirigido);
    this.inscripcionesService.addFormulario(
      [formValues],
      this.form,
      this.formBuilder
    );
  }

  clearFormArray = () => {
    const formIns = this.form.get('formularioInscripcion') as FormArray;

    while (formIns.length > 0) {
      formIns.removeAt(0);
    }
  };

  filterListForm(formId, dirigido) {
    const index = this.listaFormularios.findIndex((el) => el.id === formId);
    const data = { ...this.listaFormularios[index] };
    data.dirigido = dirigido;
    this.listaFormSubmit.push(data);
  }

  deleteForm(id: number, index: number) {
    this.listaFormSubmit = this.listaFormSubmit.filter((el) => el.id !== id);
    const formulario = (this.form.get('formularioInscripcion') as FormArray).at(
      index
    );
    formulario.patchValue({ estado: 0 });
  }
}
