import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  Categorias,
  Correos,
  Notificaciones,
  Options,
  Organismos,
  Tipos,
} from '../../../interfaces';
import { SharedService } from '@shared/services/shared.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'form-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css', '../../form.component.scss'],
})
export class StepOneComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() isEditMode: boolean = false;
  @Input() categoriaFormControl;
  @Output() eventModal = new EventEmitter<boolean>();
  @Output() eventChangeStep = new EventEmitter<boolean>();
  @Output() eventDataEdit = new EventEmitter<boolean>();
  @Output() evenSetDataOrganismo = new EventEmitter<Array<Organismos>>();

  public listaOrganismos: Array<Organismos> = [];
  public listaCorreos: Array<Correos> = [];
  public listaTipos: Array<Tipos> = [];
  public listaNotificaciones: Array<Notificaciones> = [];
  public listaCategorias: Array<Categorias> = [];
  public organismoSelect$ = new Subject<string>();
  public optionSelected: Options = { id: '', nombre: '' };
  private flag: boolean = false

  constructor(
    public clipboard: Clipboard,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.organismoSeleccionado();
    this.getDatOrganismos();
    this.getDataCorreos();
    this.getDataTipo();
    this.getDataNotificacion();
    this.eventDataEdit.emit();
  }

  openModal(): void {
    this.eventModal.emit();
  }

  changeStep(): void {
    this.eventChangeStep.emit();
  }

  setValue(value, input, type: string): void {
    let val: any;
    switch (type) {
      case 'string':
        val = value.toString();
        break;
      case 'number':
        val = parseInt(value) >= 0 ? parseInt(value) : '';
        break;
      case 'boolean':
        val = Number(value);
        break;
      default:
        val = value;
    }
    this.form.get(input).setValue(val);
  }

  setValueForm(value: any, input: any): void {
    this.form.get(input).setValue(value);
  }

  getCategoriaById(id: string): void {
    this.sharedService.getCategoriaById(id).subscribe((data) => {
      this.listaCategorias = data;
    });
  }

  organismoSeleccionado(): void {
    this.organismoSelect$.subscribe((event) => {
      this.setValue(event, 'organismo', 'number');
      this.getCategoriaById(event);
      this.categoriaFormControl.enable();
    });
  }

  getDatOrganismos(): void {
    this.sharedService.getOrganismos().subscribe((data) => {
      this.listaOrganismos = data;
      this.evenSetDataOrganismo.emit(data);
    });
  }

  getDataCorreos(): void {
    this.sharedService.getCorreos().subscribe((data) => {
      this.listaCorreos = data;
    });
  }

  getDataTipo(): void {
    this.sharedService.getTipos().subscribe((data) => {
      this.listaTipos = data;
    });
  }

  getDataNotificacion(): void {
    this.sharedService.getNotificaciones().subscribe((data) => {
      this.listaNotificaciones = data;
    });
  }

  getOrgaCateByCategoria(catId: String) {
    const orgId = this.form.get('organismo').value;
    this.sharedService.getOrgaCatById(orgId, catId).subscribe((data) => {
      this.setValueForm(data.id, 'organismoCategoria');
    });
  }

  setDataOptionSelected(data): void {
    this.optionSelected = {
      id: data[0]?.id,
      nombre: data[0]?.nombre,
    };
  }

  searchName(searchTerm:string):void {

    const registerId = this.form.get('id').value
    this.sharedService.getInscripciones(0,100,'nombre',searchTerm).subscribe((data) => {
    const existName = data.content.find((element) => searchTerm === element.nombre && element.id !== registerId)
    if (existName !== undefined){
        this.form.controls['nombre'].setErrors({
          notUnique: true
        },);
        this.flag = true
    } 
    })
  }

  onKeyPress(event:KeyboardEvent ,searchTerm:string):void {
    this.flag = false
    if (event.key === 'Enter') {
      this.onBlur(searchTerm)
    }
  }
  
  onBlur(searchTerm:string):void {
    if (!searchTerm || searchTerm.trim() === '' || this.flag === true) {
      return 
    }
    this.searchName(searchTerm)  
  }
}
