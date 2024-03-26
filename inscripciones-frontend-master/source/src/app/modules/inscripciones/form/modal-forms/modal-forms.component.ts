import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '@shared/services/shared.service';
import { InscripcionesService } from '../../inscripciones.service';
import { DiasInst, Sedes } from '../../interfaces';

@Component({
  selector: 'modal-forms',
  templateUrl: './modal-forms.component.html',
  styleUrls: ['./modal-forms.component.css'],
})
export class ModalFormsComponent implements OnInit {
  @Output() eventModalIns = new EventEmitter();
  @Input() myForm;
  modalRef?: BsModalRef;

  public isEdit: boolean = false;
  public DiasInst: DiasInst[];

  constructor(
    private inscripcionesService: InscripcionesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.myForm);
  }

  ngOnDestroy(): void {
    this.myForm.patchValue({ formulario: null, dirigido: null });
  }

  submit() {
    this.eventModalIns.emit(true);
  }

  cancelForm() {
    this.myForm.patchValue({ formulario: null, dirigido: null });
  }
}
