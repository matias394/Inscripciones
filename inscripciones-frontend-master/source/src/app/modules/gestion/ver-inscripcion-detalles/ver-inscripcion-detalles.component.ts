import {Component, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscritoService } from '@shared/services/inscritos.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AmazonS3Service } from '@shared/services/amazonS3.service';
import {FormulariosService2} from "@shared/services/formularios.service";
import {BodyBotiDto} from "@shared/models/bodyBotiDto";
import {of} from "rxjs";
import {DopplerDTO} from "@shared/models/dopplerDTO";
import {PrevisualizandoFormularioComponent} from "@modules/formularios/formularios/componentes/previsualizando-formulario/previsualizando-formulario.component";

@Component({
  selector: 'app-ver-inscripcion-detalles',
  templateUrl: './ver-inscripcion-detalles.component.html',
  styleUrls: ['./ver-inscripcion-detalles.component.scss'],
})
export class VerInscripcionDetallesComponent {
  public expandContent: boolean = false;
  public expandSecondContent: boolean = false;
  public selectedId: number = 0;
  public selectedIdTwo: any;
  public archivoExists: boolean;
  public archivo: any;
  public isAlert: boolean = false;
  public instancia: any;
  public inscripcion: any;
  public instanciaSede:any;
  public nombreCurso: string = '';
  public instanciaId:any;
  public instanciaSedeId:any;
  public inscripcionId:any;
  public resultSaved: boolean = false;
  public correct: boolean =false
  public errorMessage: boolean = false
  public message: string;
  public tableData: any[] = [
    {
      id: 1,
      categoria: 'Información general',
    },
    {
      id: 2,
      categoria: 'Cuestionario',
    },
    {
      id: 3,
      categoria: 'Archivo',
    },
  ];
  public tableData2: any[];
  public tableData3: any[] = [];
  public mongoID: String;
  public formulario: any;
  public respuestaId: any;
  public respuestaCiudadano: any;
  public formId: String;
  public formResult: any;
  public stepIsActive: boolean = true;
  public activeStep: number = 2;
  @ViewChild(PrevisualizandoFormularioComponent, { static: false })
  childComponentRef: PrevisualizandoFormularioComponent;
  constructor(
    private route: ActivatedRoute,
    private inscritoService: InscritoService,
    private tokenService: TokenStorageService,
    private amazonService: AmazonS3Service,
    private formulariosService: FormulariosService2,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.mongoID = params.get('id');
      this.loadInscripcionDetalle(this.mongoID);
    });
    this.formResult = this.tokenService.getForm();
    this.instancia = this.tokenService.getInstancia();
    this.inscripcion = this.tokenService.getInscription();
    // this.formId = this.tokenService.getFormId();
    /* Construyendo datos de la tabla */
    this.instanciaSede = this.tokenService.getInstanciaSede();
    /*******************************/
  }

  //CHANGE EXPAND CONTENT
  expandRowContent(id: number) {
    this.expandContent = !this.expandContent;
    this.selectedId = id; //ID DE LA INSCRIPCION
    // this.fetchNestedData(this.selectedId, this.userIdNumber);
  }

  expandRowContentTwo(id: number) {
    this.expandSecondContent = !this.expandSecondContent;
    this.selectedIdTwo = id; //ID DE LA INSTANCIA
  }

  loadInscripcionDetalle(mongoID) {
    this.inscritoService
      .getInscriptionDetalleByMongoID(mongoID)
      .subscribe((response) => {
        this.formId = response.formData.id;

        const uniqueDays = new Set<string>();
          const horariosAgrupados = {};

          response.horarios = response.horarios.sort((a, b) => {
            return this.orderHours(a.horario) - this.orderHours(b.horario);
          });

          response.horarios.forEach((horario) => {
            uniqueDays.add(horario.dias);

            if (!horariosAgrupados[horario.dias]) {
              horariosAgrupados[horario.dias] = [];
            }

            horariosAgrupados[horario.dias].push(horario.horario);
          });

          response.horarios = Array.from(uniqueDays).map((dias) => ({
            dias: dias
              .split(' - ')
              .map((dia) => dia.substring(0, 3))
              .join(', '),
            horario: horariosAgrupados[dias]
              .sort((a, b) => {
                return this.orderHours(a) - this.orderHours(b);
              })
              .join('\n'),
              horarioFormateado: horariosAgrupados[dias]
                .sort((a, b) => this.orderHours(a) - this.orderHours(b))
                .map((timeSlot) => timeSlot.replace('a', '-'))
                .join(', '),
          }));

        this.tableData2 = [
          {
            id: 1,
            dias: response.horarios.dias,
            horarios: response.horarios,
            sede: response.sede,
            cupos: response.cupos,
            profesor: response.profesor,
          },
        ];

        console.log('this.tableData2 :>> ', this.tableData2);
        this.instanciaId = response.instanciaId
        this.inscripcionId = response.inscripcionId
        this.instanciaSedeId = response.instanciaSedeId

        this.nombreCurso = response.nombreInscripcion;

        this.respuestaCiudadano = response.respuesta;

        this.respuestaId = response.id

        if (response.respuesta.archivo != null) {
          const fileInfo = {
            cuil: this.tokenService.getUserManagement().cuil,
            inscripcion: this.tokenService.getUserManagement().inscriptionId,
            instancia: response.instanciaSedeId,
          };
          this.getAmazonFile(fileInfo);
        } else {
          this.archivoExists = false;
        }
      });
  }

  getSelectedDays(r) {
    let days = {
      lunes: r.lunes,
      martes: r.martes,
      miercoles: r.miercoles,
      jueves: r.jueves,
      viernes: r.viernes,
      sabado: r.sabado,
      domingo: r.domingo,
    };

    const selectedDays = Object.entries(days)
      .filter(([day, value]) => value === 1)
      .map(([day]) => day.slice(0, 1).toUpperCase() + day.slice(1, 3)) // Capitalize the first letter and take the next two letters (e.g., "Mar", "Vie")
      .join(', ');

    return selectedDays;
  }

  getSelectedDaysArray(r) {
    let days = {
      lunes: r.lunes,
      martes: r.martes,
      miercoles: r.miercoles,
      jueves: r.jueves,
      viernes: r.viernes,
      sabado: r.sabado,
      domingo: r.domingo,
    };

    const selectedDays = Object.entries(days)
      .filter(([day, value]) => value === 1)
      .map(([day]) => day.slice(0, 3).toUpperCase());

    return selectedDays;
  }

  getTimeRanges(selectedDays, startTime, endTime) {
    const timeRanges = selectedDays.map((day) => `${startTime} a ${endTime}hs`);
    const timeRangesString = timeRanges.join(', ');

    return timeRangesString;
  }

  getFormResult(formResult: any) {
    this.formResult = formResult;
  }

  getAmazonFile(amazonInfo: any) {
    this.amazonService.getAmazonFile(amazonInfo).subscribe((response) => {
      this.archivo = response;
      this.archivoExists = true;
    });
  }

  downloadDocument() {
    const blob = this.b64toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.archivo.fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  b64toBlob() {
    const byteCharacters = atob(this.archivo.base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: '' });
    return blob;
  }

  save() {
    this.formResult.archivo = null;
    let body = {
      id: this.respuestaId,
      inscripcionId: this.inscripcionId,
      instanciaId: this.instanciaId,
      instanciaSedeId: this.instanciaSedeId,
      formularioId: this.formId,
      cuil: this.formResult.cuil,
      nombre: this.formResult.nombre,
      apellido: this.formResult.apellido,
      email: this.formResult.email,
      nombreMiba: null,
      apellidoMiba: null,
      cuilMiba: null,
      emailMiba: null,
      respuesta: this.formResult,
      synchronizedToOracle: false,
      estado: true,
      deleted: false,
      createdAt: this.getCurrentTime(),
      synchronizedError: null,
    };

    this.formulariosService.saveCitizenResponse(body).subscribe(
      (response) => {
        let inscripcionMongoId = response.id;
        this.resultSaved = true;
        const notifyType = this.inscripcion.notificacion;
        switch (notifyType) {
          /*case 1:
            this.sendDoppler(inscripcionMongoId);
            break;
          case 2:
            this.sendBoTI();
            break;
          case 3:
            this.sendBoTI();
            this.sendDoppler(inscripcionMongoId);
            break;*/
        }

        if (this.resultSaved) {
            this.correct=true
          this.message = "Respuestas Actualizadas Correctamente"
        }
      },
      (error) => {
        this.errorMessage= true
        this.message= "Error al Actualizar Respuestas"
        console.log(error);
      }
    );
  }

  closeAlert() {
    this.isAlert = false;
  }

  getCurrentTime() {
    const dateObj = new Date();

    let year = dateObj.getFullYear();

    let month = dateObj.getMonth();
    let monthStr = ('0' + (month + 1)).slice(-2);

    let date = dateObj.getDate();
    let dateStr = ('0' + date).slice(-2);

    let hour = dateObj.getHours();
    let hourStr = ('0' + hour).slice(-2);

    let minute = dateObj.getMinutes();
    let minuteStr = ('0' + minute).slice(-2);

    let second = dateObj.getSeconds();
    let secondStr = ('0' + second).slice(-2);

    const time = `${year}-${monthStr}-${dateStr} ${hourStr}:${minuteStr}:${secondStr}`;

    return time;
  }

  nextStep() {
    if (this.formIsValidated()) {
      this.activeStep = this.activeStep + 1;
      this.stepIsActive = true;
      setTimeout(() => {
        this.save()
      }, 2000);

    }
  }

  formIsValidated(): boolean {
    return (
      this.childComponentRef.isFormValid() &&
      !this.childComponentRef.esPosibleAvanzarSeccion()
    );
  }

  orderHours (timeString: string): number {
    const timeParts = timeString.split(' ');
    const time = timeParts[0];
    const [hours, minutes] = time.split(':').map((part) => parseInt(part, 10));
    return hours * 60 + minutes;
  };
}
