import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { SharedService } from '@shared/services/shared.service';
import { formatDateEN } from '@utils/formatDate';
import { InscripcionesService } from '../../../inscripciones.service';
import {
  DataTableInstacias,
  Mindate,
  Modalidades,
  Sedes,
} from '../../../interfaces';

import { ModalInstanciaComponent } from '../../modal-instancia/modal-instancia.component';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { minLengthArray } from '@utils/validation';

const ELEMENT_DATA: DataTableInstacias[] = [];

@Component({
  selector: 'form-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css', '../../form.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class StepTwoComponent implements OnInit {
  @ViewChild(ModalInstanciaComponent) modalForm;
  @ViewChild('table', { static: true, read: MatTable }) table;
  @Input() form;
  @Input() formInscripciones;
  @Output() eventModalCancel = new EventEmitter();
  @Output() eventModalIns = new EventEmitter();
  @Output() eventChangeStep = new EventEmitter();
  @Output() eventStepDown = new EventEmitter();
  @Output() eventResetForm = new EventEmitter();
  @Output() eventShowAlert = new EventEmitter<{
    status: string;
    message: string;
  }>();

  dataSource$ = new Subject<string>();

  public MODALIDAD_VIRTUAL = 2;
  public MODALIDAD_PRESENSIAL = 1;

  public instanciaDto: DataTableInstacias;
  public dayIsSelected: boolean = false;
  public minDate: Mindate = { year: null, month: null, day: null };
  public listaModalidades: Array<Modalidades> = [];
  public listaSedes: Array<Sedes> = [];
  public formIsSubmitted: boolean = false;
  public modalFormStatus = false;
  public formIsInvalid: boolean = false;
  private newSedeData;
  public validInstSede: boolean = false;

  public dataSource = ELEMENT_DATA;
  public headersToDisplayII = [
    {
      title: 'Nombre De La Instancia',
      ref: 'nombre',
    },
    {
      title: 'Código',
      ref: 'codigo',
    },
    {
      title: 'Modalidad',
      ref: 'modalidadName',
    },
    {
      title: 'Desde',
      ref: 'vigenciaInicio',
    },
    {
      title: 'Hasta',
      ref: 'vigenciaFin',
    },
  ];
  public columnsToDisplay = [
    'nombre',
    'codigo',
    'modalidadName',
    'vigenciaInicio',
    'vigenciaFin',
  ];
  public columnsToDisplayWithExpand = [
    ...this.columnsToDisplay,
    'acciones',
    'expand',
  ];

  public expandedElement: DataTableInstacias | null;

  constructor(
    private inscripcionesService: InscripcionesService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getDataSedes();
    this.getDataModalidades();
    this.updateDataSource();
  }

  gettitleColumn(colunm): string[] {
    const title = this.headersToDisplayII.map((header) => {
      if (header.ref === colunm) {
        return header.title;
      }
      return '';
    });
    return title;
  }

  getDataSedes(): void {
    this.sharedService.getSedes().subscribe((data) => {
      this.listaSedes = data;
    });
  }

  getDataModalidades(): void {
    this.sharedService.getModalidades().subscribe((data) => {
      this.listaModalidades = data;
    });
  }

  getValidDataSource(): boolean {
    return !this.dataSource[0].show;
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

  createInstanciasForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(null),
      nombre: new FormControl(null),
      codigo: new FormControl(' - '),
      modalidad: new FormControl(null),
      modalidadName: new FormControl(null),
      vigenciaInicio: new FormControl(null),
      vigenciaFin: new FormControl(null),
      duracionSemana: new FormControl(null),
      limiteInscripcion: new FormControl(null),
      estado: new FormControl(1),
      instanciaSedes: this.formBuilder.array([]),
      bloqueado: new FormControl(0),
    });
  }

  // FormGroup de Sedes (InstanciaSedes)
  createSedeForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(null),
      estado: new FormControl(1),
      sede: new FormControl(''),
      cupos: new FormControl(null),
      dias: new FormArray([]),
      claseHorarios: new FormArray([]),
      vigenciaInicio: new FormControl(null),
      vigenciaFin: new FormControl(null),
      claseDTOList: new FormArray([]),
      urlSede: new FormControl(null),
    });
  }

  createClaseDTOListForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(null),
      sede: new FormControl(null),
      cupos: new FormControl(null),
      dias: new FormArray([]),
      horaInicio: new FormControl(null),
      horaFin: new FormControl(null),
      vigenciaInicio: new FormControl(null),
      vigenciaFin: new FormControl(null),
      dia: new FormControl(null),
      fecha: new FormControl(null),
      nombre: new FormControl(null),
      bloqueado: new FormControl(0),
    });
  }

  async updateDataSource() {
    this.inscripcionesService
      .getDataSource()
      .subscribe(({ dataSource, index }) => {
        if (dataSource) {
          this.dataSource[index].instanciaSedes.push(dataSource);
          this.formInscripciones.controls[
            'instancias'
          ].updateValueAndValidity();
          this.table.renderRows();
        } else {
          this.dataSource = [];
        }
      });
  }

  /** TODO: actualizar interfaces de instancias */
  addInstaciasForm(data: DataTableInstacias, edit = false) {
    let instacias = {};
    if (edit) {
      const {
        vigenciaFin,
        vigenciaInicio,
        nombre,
        modalidadName,
        duracionSemana,
        estado,
        id,
        bloqueado,
        limiteInscripcion,
        modalidad,
      } = data;

      const newData = {
        nombre,
        duracionSemana,
        estado,
        id,
        limiteInscripcion,
        modalidad,
        modalidadName,
        vigenciaInicio,
        vigenciaFin,
        instanciaSedes: [],
        bloqueado,
        show: true,
      };
      this.dataSource.push(newData);
      instacias = newData;
    } else {
      const { modalidad } = this.instanciaDto; // Data del formulario
      const {
        vigenciaFin,
        vigenciaInicio,
        nombre,
        modalidadName,
        duracionSemana,
        estado,
        id,
        bloqueado,
        limiteInscripcion,
      } = data; // Data del response API
      const newData = {
        nombre,
        duracionSemana,
        estado,
        limiteInscripcion,
        id,
        modalidadName,
        modalidad,
        vigenciaFin,
        vigenciaInicio,
        instanciaSedes: [],
        bloqueado,
        show: true,
      };
      this.dataSource.push(newData);
      instacias = newData;
    }

    const instanciasForm = this.createInstanciasForm();

    instanciasForm.patchValue(instacias);
    instanciasForm.controls['instanciaSedes'].addValidators([
      minLengthArray(1),
    ]);
    instanciasForm.controls['instanciaSedes'].updateValueAndValidity();
    (this.formInscripciones.get('instancias') as FormArray).push(
      instanciasForm
    );
    this.table.renderRows();
  }

  addSedeInstancia(formEdit: any, indexInstCurrent: number) {
    const sedeData = formEdit;
    sedeData.claseDTOList = sedeData.claseDTOMapperList;
    console.log(sedeData)
    sedeData.sede = +sedeData.sede;
    const instanciaForm = this.formInscripciones.get('instancias') as FormArray;
    const { vigenciaInicio, vigenciaFin } =
      instanciaForm.at(indexInstCurrent).value;

    // Agrego las fechas de Incio/Fin del formulario Instancia para enviarlo al servicio
    sedeData.vigenciaInicio = vigenciaInicio;
    sedeData.vigenciaFin = vigenciaFin;

    this.newSedeData = this.createSedeForm();

    // Se crea y pushuea los dias seleccionado al formulario Sede en el parametro dia
    this.inscripcionesService.addDays(
      sedeData.dias, // TODO: cambiar a sedeData.dias
      this.newSedeData
    );
    if(sedeData.claseHorarios != null){
      this.inscripcionesService.addClasesHorario(
        sedeData.claseHorarios,
        this.newSedeData
      );
        this.inscripcionesService.addClase(sedeData.claseDTOList, this.newSedeData,
          { // Esto se debe cambiar para multiples horarios.
          horaFin: sedeData.horaFin,
          horaInicio: sedeData.horaInicio,
        }
      );
    }
    this.newSedeData.patchValue(sedeData);
    // PatchValue al formulario sede
    this.inscripcionesService.addInsSedeData(
      indexInstCurrent,
      this.newSedeData,
      this.formInscripciones
    );
  }

  resetFormInstancias() {
    this.eventResetForm.emit();
  }

  sendformInstancias() {
    this.formIsSubmitted = true;
    this.instanciaDto = { ...this.form.value };
    this.instanciaDto.vigenciaFin = formatDateEN(this.instanciaDto.vigenciaFin);
    this.instanciaDto.vigenciaInicio = formatDateEN(
      this.instanciaDto.vigenciaInicio
    );

    this.inscripcionesService.generarInstancia(this.instanciaDto).subscribe(
      (response) => {
        if (response.length > 0) {
          response.forEach((res) => this.addInstaciasForm(res));
          this.resetFormInstancias();
          this.eventShowAlert.emit({
            status: 'alert-success',
            message: 'Instancia creada exitosamente',
          });
        } else {
          this.eventShowAlert.emit({
            status: 'alert-warning',
            message:
              'Por favor verifique que las fecha de Inicio y Fin concuerden con la Duración de semanas',
          });
        }
        this.formIsSubmitted = false;
      },
      (error) => {
        this.formIsSubmitted = false;
        this.eventShowAlert.emit({
          status: 'alert-danger',
          message: 'Error al crear una instancia',
        });
      }
    );
  }

  deleteInstancia(id: any, indice: number) {
    // Eliminar la instancia de la lista
    if (this.dataSource[indice].id === null) {
      const oldLista = this.dataSource.filter(
        (item, index) => index !== indice
      );
      this.dataSource = oldLista;
    } else {
      this.dataSource.forEach((item, index) => {
        if (index === indice) {
          item.show = false;
          item.estado = 0;
        }
      });
    }
    // Cambiar Status de la instancia que se envia
    const instancia = (
      this.formInscripciones.get('instancias') as FormArray
    ).at(indice) as FormArray;
    if (instancia.get('id').value === null) {
      (this.formInscripciones.get('instancias') as FormArray).removeAt(indice);
    } else if (instancia.get('id').value === id) {
      instancia.controls['estado'].patchValue(0);
      // Se eliminan todas las sedes
      const sedes = instancia.get('instanciaSedes') as FormArray;
      if (sedes.length > 0) {
        sedes.controls.forEach((control) => {
          control.patchValue({ estado: 0 });
        });
      }
    }
    this.table.renderRows();
  }

  deleteInstSede(dataIndex: number, indexSede: number, idSede: number) {
    const instanciaForm = this.formInscripciones.get('instancias') as FormArray;
    // Obtengo el FormGroup de Sedes segun el index del formulario Instancia
    const sedes = instanciaForm
      .at(dataIndex)
      .get('instanciaSedes') as FormArray;

    const sede = sedes.at(indexSede);

    if (sede.get('id').value === idSede && sede.get('id').value !== null) {
      sede.patchValue({ estado: 0 });
    } else if (sede.get('id').value === null) {
      sedes.removeAt(indexSede);
    }

    // const sede = sedes.at(indexSede).getRawValue();
    // sedes.at(indexSede).patchValue({ ...sede, estado: 0 });
    // sedes.removeAt(indexSede);

    const oldLista = [...this.dataSource];
    oldLista[dataIndex].instanciaSedes = oldLista[
      dataIndex
    ].instanciaSedes.filter((item, index) => index !== indexSede);

    this.dataSource = oldLista;
    this.table.renderRows();
  }

  selectDay(event: any) {
    this.dayIsSelected = event.target.checked;
    if (this.dayIsSelected) {
      this.form.get(event.target.name).setValue(1);
    } else {
      this.form.get(event.target.name).setValue(0);
    }
  }

  changeMinDate(date: any): void {
    this.minDate = {
      year: parseInt(date.year),
      month: parseInt(date.month),
      day: parseInt(date.day),
    };
  }

  getDias(item) {
    const arrDias = [];

    Object.keys(item).forEach(function (key) {
      switch (key) {
        case 'domingo':
          if (item.domingo) arrDias.push('Dom');
          return;
        case 'lunes':
          if (item.lunes) arrDias.push('Lun');
          return;
        case 'martes':
          if (item.martes) arrDias.push('Mar');
          return;
        case 'miercoles':
          if (item.miercoles) arrDias.push('Mie');
          return;
        case 'jueves':
          if (item.jueves) arrDias.push('Jue');
          return;
        case 'viernes':
          if (item.viernes) arrDias.push('Vie');
          return;
        case 'sabado':
          if (item.sabado) arrDias.push('Sab');
          return;
        default:
          return;
      }
    });

    return arrDias.toString();
  }

  showDetail(id) {}
}
