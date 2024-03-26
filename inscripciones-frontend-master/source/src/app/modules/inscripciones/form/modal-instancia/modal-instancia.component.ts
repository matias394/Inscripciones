import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '@shared/services/shared.service';
import { InscripcionesService } from '../../inscripciones.service';
import {
  clasesDto,
  daysList,
  DiasInst,
  Sedes,
  sedesDto,
} from '../../interfaces';
import { Console } from 'console';
import { minSelectedCheckboxes } from '@utils/validation';
import { ClaseDTOList } from '../../interfaces';

@Component({
  selector: 'modal-instancia',
  templateUrl: './modal-instancia.component.html',
  styleUrls: ['./modal-instancia.component.css'],
})
export class ModalInstanciaComponent implements OnInit {
  @Output() eventModalSede = new EventEmitter();
  @Output() resetForm = new EventEmitter();
  @Output() addDias = new EventEmitter();
  @Input() indexInstCurrent;
  @Input() form; // Formulario de Sedes
  @Input() formInscripciones; // Formulario de Inscripciones (General)
  @Input() formInst; // Formulario de Instancias
  modalRef?: BsModalRef;

  public days = [
    { dia: 'lunes', value: 0, label: 'Lunes' },
    { dia: 'martes', value: 0, label: 'Martes' },
    { dia: 'miercoles', value: 0, label: 'Miércoles' },
    { dia: 'jueves', value: 0, label: 'Jueves' },
    { dia: 'viernes', value: 0, label: 'Viernes' },
    { dia: 'sabado', value: 0, label: 'Sábado' },
    { dia: 'domingo', value: 0, label: 'Domingo' },
  ];

  public MODALIDAD_VIRTUAL = 2;
  public MODALIDAD_PRESENCIAL = 1;

  public formInstSedes;
  public isEdit: boolean = false;
  public DiasInst: DiasInst[];
  public listaSedes: Array<Sedes> = [];
  public listaInstSedes: Array<clasesDto> = []; // TODO: ACTUALIZAR NUEVA INTERFACES
  private newSedeData;
  private instanciaCurrent;
  public modalidadIns;
  // private reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  private reg =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private inscripcionesService: InscripcionesService
  ) {}

  ngOnInit(): void {
    // Se crea un FormGroup de sede
    this.newSedeData = this.createSedeForm();
    this.getDataSedes();
    this.formInstanciaSedes();

    this.instanciaCurrent = (
      this.formInscripciones.get('instancias') as FormArray
    ).at(this.indexInstCurrent);
    this.modalidadIns = this.instanciaCurrent.value.modalidad;
    if (this.modalidadIns === this.MODALIDAD_VIRTUAL) {
      this.form.controls['urlSede'].addValidators([Validators.required]);
    } else if (this.modalidadIns === this.MODALIDAD_PRESENCIAL) {
      this.form.controls['sede'].addValidators([Validators.required]);
    }
    // console.log(this.form);
    // console.log(this.modalidadIns);
  }

  formInstanciaSedes() {
    this.formInstSedes = this.formBuilder.group({
      sede: [''],
      urlSede: ['', [Validators.pattern(this.reg)]],
      cupos: ['', [Validators.required, Validators.min(1)]],
      dias: new FormArray([], minSelectedCheckboxes(1)),
      horaInicio: ['10:00:00', [Validators.required]],
      horaFin: ['12:00:00', [Validators.required]],
      vigenciaInicio: [''],
      vigenciaFin: [''],
      claseDTOList: new FormArray([]),
      claseHorarios: new FormArray([]),
    });
    this.addDays();
  }

  public addDays(days?) {
    const dataDays = days ? days : daysList.slice();
    dataDays.forEach((item) => this.DaysFormArray.push(new FormControl(item)));
  }

  get DaysFormArray() {
    return this.formInstSedes.controls.dias as FormArray;
  }

  openModal(template: TemplateRef<any>) {}

  getDataSedes(): void {
    this.sharedService.getSedes().subscribe((data) => {
      this.listaSedes = data;
    });
  }

  addNewSedes(): void {
    (this.form.get('sedes') as FormArray).clear();
  }

  // FormGroup de Sedes (InstanciaSedes)
  createSedeForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(null),
      sede: new FormControl(''),
      urlSede: new FormControl(''),
      cupos: new FormControl(null),
      dias: new FormArray([]),
      // horario: new FormArray([]),
      // horaInicio: new FormControl(null),
      // horaFin: new FormControl(null),
      vigenciaInicio: new FormControl(null),
      vigenciaFin: new FormControl(null),
      claseDTOList: new FormArray([]),
      estado: new FormControl(1),
      claseHorarios: new FormArray([]),
    });
  }

  createClaseForm(): FormGroup {
    return this.formBuilder.group({
      nombre: new FormControl(null),
      bloqueado: new FormControl(0),
      dia: new FormControl(null),
      fecha: new FormControl(null),
      estado: new FormControl(null),
      fechaFin: new FormControl(null),
      fechaInicio: new FormControl(null),
      id: new FormControl(null),
      instaciaSedeId: new FormControl(null),
      nombreProfesor: new FormControl(null),
    });
  }

  // TODO: pasar a el servicio de inscripciones
  updateDataSource() {
    // Obtengo el FormGroup de Sedes segun el index del formulario Instancia
    const sedes = this.instanciaCurrent.get('instanciaSedes') as FormArray;

    const claseHorarios = [];

    this.listaInstSedes.forEach((clase) => {
      this.newSedeData.controls.claseHorarios.push(
        new FormControl(clase.dia + ' ' + clase.horario)
      );
    });

    // Push al forulario sede
    sedes.push(this.newSedeData);
    // const instanciaForm = this.formInscripciones.get('instancias') as FormArray;
    // const { instanciaSedes } = instanciaForm.at(this.indexInstCurrent).value;

    this.inscripcionesService.setDataSource(
      this.newSedeData.value,
      this.indexInstCurrent
    );
  }

  timeShort(value): string {
    const parts = value.split(':');
    return parts[0] + ':' + parts[1] + ' hs';
  }

  title(str): any {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  addSedeInstancia(ngForm: any) {
    const sedeData: sedesDto = this.formInstSedes.value;
    sedeData.sede = +sedeData.sede;

    const instanciaForm = this.formInscripciones.get('instancias') as FormArray;
    const { vigenciaInicio, vigenciaFin } = instanciaForm.at(
      this.indexInstCurrent
    ).value;

    // Agrego las fechas de Incio/Fin del formulario Instancia para enviarlo al servicio
    sedeData.vigenciaInicio = vigenciaInicio;
    sedeData.vigenciaFin = vigenciaFin;

    this.inscripcionesService.generarClaseSede(sedeData).subscribe(
      (response) => {
        // sedeData.instanciaSedeDetalle = response.instanciaSedeDetalle;
        sedeData.estado = 1;
        // PatchValue al formulario sede
        this.newSedeData.patchValue({ ...sedeData });
        // Se crea y pushuea los dias seleccionado al formulario Sede en el parametro dia
        this.inscripcionesService.addDays(sedeData.dias, this.newSedeData);
        this.inscripcionesService.addClase(
          response.claseDTOList,
          this.newSedeData,
          {
            horaInicio: sedeData.horaInicio,
            horaFin: sedeData.horaFin,
          }
        );

        response.claseDTOList.forEach((el) => {
          const horaInicio = this.timeShort(sedeData.horaInicio);
          const horaFin = this.timeShort(sedeData.horaFin);
          const horario = horaInicio + ' a ' + horaFin;
          const dia = this.title(el.dia);
          el.dia = dia;
          el.dias = [];
          const index = this.listaInstSedes.findIndex(
            (item) => item.horario === horario
          );

          if (index > -1) {
            const currentDias = this.listaInstSedes[index].dias;
            const dCurrent = currentDias.indexOf(dia);

            if (dCurrent === -1) {
              this.listaInstSedes[index].dias.push(dia);
              this.listaInstSedes[index].dia += ' - ' + dia;
            }
          } else {
            this.listaInstSedes.push({
              ...el,
              dias: [dia],
              horario: horaInicio + ' a ' + horaFin,
            });
          }
        });

        // console.log('newSedeData', this.newSedeData);
        // console.log('listaInstSedes', this.listaInstSedes);

        this.resetForm.emit();
        ngForm.submitted = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCheckChangeDay(i, event): void {
    const newValue: any[] = Array.from(this.days);
    newValue[i].value = Number(event.checked);
    (this.formInstSedes.get('dias') as FormArray).controls[i].setValue(
      newValue[i]
    );
  }

  valueChangeBoolean(value: number): boolean {
    return Boolean(value);
  }

  setDataEdit(index): void {
    const data = { ...this.listaInstSedes[index] };
    data.id = index;
    this.isEdit = !this.isEdit;
    data.dias.forEach((d, index) => {
      (this.form.get('dias') as FormArray).controls[index].setValue(d);
    });
    this.form.setValue(data);
    this.form.get('sede').disable();
    this.form.get('cupos').disable();
  }

  canselEdit(): void {
    this.isEdit = !this.isEdit;
    this.resetForm.emit();
  }

  updateListaInstSedes(): void {
    const sede: sedesDto = this.form.value;
    this.canselEdit();
  }
}
