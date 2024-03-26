import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { FormulariosService } from '@shared/services/formularios.service';
import { InscripcionesService } from '@shared/services/inscripciones.service';
import { BotiService } from '@shared/services/boti.service';
import { BodyBotiDto } from '@shared/models/bodyBotiDto';
import { DopplerService } from '@shared/services/doppler.service';
import { DopplerDTO } from '@shared/models/dopplerDto';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { AmazonS3Service } from '@shared/services/amazonS3.service';
import { SpinnerService } from '@components/spinner/spinner.service';
import { QRService } from '@shared/services/qr.service';
import { orderHours } from '@utils/orderFunctions';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss'],
})
export class InscripcionComponent implements OnInit, OnDestroy {
  public image: string = './assets/img/banner-two.png';
  public description: string;
  public stepIsActive: boolean = true;
  public activeStep: number = 1;
  public correct: boolean = false;
  public error: boolean = false;
  public isAlert: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';
  public modalSwitch: boolean = false;
  public idNumber: number = 0;
  public formId: string = '';
  public formResult: any = null;
  public infoInscripcion: any = null;
  public instanciaSedeInfo: any = null;
  public userInfo: any = null;
  public resultSaved: boolean = false;
  public disabledStep2: boolean;
  public cantidadCuposUsuario: number = 0;
  public cantidadCuposInscripcion: number = 0;
  public message: string;
  public ClassDays: string;
  public qrRoute: string;
  private token: string = null;
  private codeInscription: string;

  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private formulariosService: FormulariosService,
    private inscripcionesService: InscripcionesService,
    private botiService: BotiService,
    private dopplerService: DopplerService,
    private windowDimensionService: WindowDimensionService,
    private AmazonS3Service: AmazonS3Service,
    private readonly spinnerService: SpinnerService,
    private qrService: QRService
  ) {
    if (this.tokenService.getJwtToken === null) {
      this.token = this.tokenService.getToken();
    } else {
      this.token = this.tokenService.getJwtToken();
    }
    this.codeInscription = this.tokenService.getCodeInscription();
    console.log(this.codeInscription);
  }

  ngOnInit(): void {
    this.loadForm();
    this.description = this.tokenService.getTitleInscription();
    this.instanciaSedeInfo = this.tokenService.getTableInformation();

    this.instanciaSedeInfo.horarioFormateado = formatHorariosToString(
      this.instanciaSedeInfo.horarios
    );
    this.instanciaSedeInfo.horarioFormateadoBoti = formatHorariosToStringBoti(
      this.instanciaSedeInfo.horarios
    );
    this.instanciaSedeInfo.horarioFormateadoDoppler =
      formatHorariosToStringDoppler(this.instanciaSedeInfo.horarios);

    console.log(
      'this.instanciaSedeInfo.horarioFormateadoDoppler  :>> ',
      this.instanciaSedeInfo.horarioFormateadoDoppler
    );

    this.defineDays();

    this.loadPreviewInfo();
    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        if (width <= this.maxWidthMobile) {
          this.image = './assets/img/banner-responsive.jpeg';
        } else {
          this.image = './assets/img/banner-two.png';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }

  loadForm() {
    this.formulariosService
      .getFormByIdInscripcion(this.codeInscription, this.token)
      .subscribe(
        (response) => {
          console.log(response);
          this.formId = response.idRefMongo;
          console.log(this.formId);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadPreviewInfo() {
    const codeInscription = this.tokenService.getCodeInscription();
    this.inscripcionesService
      .getInscripcionById(codeInscription, this.token)
      .subscribe(
        (response) => {
          this.cantidadCuposUsuario = response.cantidadMaxima;
          this.cantidadCuposInscripcion = response.cuposInscripcion;
          this.infoInscripcion = response;
          this.userInfo = this.tokenService.getUserInformation();
          this.disabledStep2 = false;
          if (this.userInfo === undefined) {
            this.userInfo = {}; //valida que exista
            this.userInfo.nombre = this.formResult?.nombre;
            this.userInfo.apellido = this.formResult?.apellido;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getFormResult(formResult: any) {
    this.formResult = formResult;
  }

  //MODAL
  openModal() {
    this.modalSwitch = true;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  redirectToPage() {
    this.router.navigate(['../../']);
  }

  //STEPPER FUNCTIONS
  changeStep() {
    this.activeStep = this.activeStep + 1;
    this.stepIsActive = true;
  }

  stepDown() {
    this.activeStep = this.activeStep - 1;
    this.stepIsActive = true;
  }

  submit = (e: Event) => {
    e.preventDefault();
  };

  saveResult() {
    this.isInscrito();
  }

  save() {
    const userInfo = {
      name: this.formResult.nombre,
      lastName: this.formResult.apellido,
      cuil: this.formResult.cuil,
      instanciaSedeId: this.instanciaSedeInfo.id,
    };
    /** Generate QR **/
    this.qrService.getQR(userInfo, this.token).subscribe(
      (response) => {
        const jsonResponse = JSON.parse(response);
        this.qrRoute = jsonResponse.url;
        this.saveAmazonFile();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveAmazonFile() {
    /* S3 */
    if (this.formResult.archivo) {
      const fileForm = this.formResult.archivo;
      const fileName = fileForm.nombre;
      const base64 = fileForm.content;

      let req = {
        file: base64,
        fileName: fileName,
        cuil: this.formResult.cuil,
        inscripcion: this.infoInscripcion.id,
        instancia: this.instanciaSedeInfo.id,
      };

      this.AmazonS3Service.saveAmazonFile(req, this.token).subscribe(
        (response: string) => {
          this.saveCitizen(this.token);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.saveCitizen(this.token);
    }
  }

  saveCitizen(token: any) {
    let body;
    this.formResult.archivo = null;

    // let formResultSerialized = JSON.stringify(this.formResult)
    //   .split('"')
    //   .join("'");
    if (this.userInfo) {
      body = {
        inscripcionId: this.infoInscripcion.id,
        instanciaId: this.instanciaSedeInfo.idInstancia,
        instanciaSedeId: this.instanciaSedeInfo.id,
        sedeId: this.instanciaSedeInfo.sedeId,
        formularioId: this.formId,
        cuil: this.formResult.cuil,
        nombre: this.formResult.nombre,
        apellido: this.formResult.apellido,
        email: this.formResult.email,
        nombreMiba: this.userInfo.nombre,
        apellidoMiba: this.userInfo.apellido,
        cuilMiba: this.userInfo.cuil,
        emailMiba: this.userInfo.email,
        respuesta: this.formResult,
        synchronizedToOracle: false,
        synchronizedError: null,
        estado: true,
        deleted: false,
        createdAt: this.getCurrentTime(),
      };
    } else {
      body = {
        inscripcionId: this.infoInscripcion.id,
        instanciaId: this.instanciaSedeInfo.idInstancia,
        instanciaSedeId: this.instanciaSedeInfo.id,
        sedeId: this.instanciaSedeInfo.sedeId,
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
        synchronizedError: null,
        estado: true,
        deleted: false,
        createdAt: this.getCurrentTime(),
      };
    }
    this.formulariosService.saveCitizenResponse(body, token).subscribe(
      (response) => {
        let inscripcionMongoId = response._id;
        this.resultSaved = true;
        const notifyType = this.tokenService.getNotificationNumber();
        switch (notifyType) {
          case '1':
            this.sendDoppler(inscripcionMongoId);
            break;
          case '2':
            this.sendBoTI();
            break;
          case '3':
            this.sendBoTI();
            this.sendDoppler(inscripcionMongoId);
            break;
        }
        setTimeout(() => {
          this.spinnerService.hide();
          window.location.href = this.tokenService.getReturnURL();
        }, 2000);
      },
      (error) => {
        console.log(error);
        console.log(error.stack);
      }
    );
  }

  getCurrentTime() {
    const dateObj = new Date();

    let year = dateObj.getFullYear();

    let month = dateObj.getMonth();
    let monthStr = ('0' + (month + 1)).slice(-2);
    // To make sure the month always has 2-character-format. For example, 1 => 01, 2 => 02

    let date = dateObj.getDate();
    let dateStr = ('0' + date).slice(-2);
    // To make sure the date always has 2-character-format

    let hour = dateObj.getHours();
    let hourStr = ('0' + hour).slice(-2);
    // To make sure the hour always has 2-character-format

    let minute = dateObj.getMinutes();
    let minuteStr = ('0' + minute).slice(-2);
    // To make sure the minute always has 2-character-format

    let second = dateObj.getSeconds();
    let secondStr = ('0' + second).slice(-2);
    // To make sure the second always has 2-character-format

    const time = `${year}-${monthStr}-${dateStr} ${hourStr}:${minuteStr}:${secondStr}`;

    return time;
  }

  //ALERT
  closeAlert() {
    this.isAlert = false;
  }

  sendBoTI() {
    /* Info del Formulario */
    let areaCode;
    let nombre = this.formResult.nombre;
    let apellido = this.formResult.apellido;
    let telefono = this.formResult.telefono;
    if (telefono) {
      let validatorPhone = telefono.codigoarea.toString().substr(0, 1);
      if (validatorPhone != '9') {
        areaCode = '9' + telefono.codigoarea.toString();
      } else {
        areaCode = telefono.codigoarea.toString();
      }
      let telefonoFormat =
        telefono.codigopais + areaCode + telefono.numerotelefono;

      if (telefonoFormat) {
        let botiDTO: BodyBotiDto;
        botiDTO = {
          chatPlatform: 'Whatsapp',
          chatChannelNumber: '5491150500147',
          platformContactId: telefonoFormat,
          ruleNameOrId: 'sac08push03',
          clientPayload: 'optional',
          params: {
            auxiliar: nombre + ' ' + apellido,
            auxiliar1: this.instanciaSedeInfo.nombreInscripcion,
            auxiliar2: this.instanciaSedeInfo.fechaInicio,
            auxiliar3: this.instanciaSedeInfo.horarioFormateadoBoti,
            auxiliar4: this.instanciaSedeInfo.nombreSede,
            auxiliar5: this.formResult.cuil,
            auxiliar6: this.instanciaSedeInfo.id,
          },
        };
        this.botiService.sendBotiMessage(botiDTO, this.token).subscribe(
          (response) => {},
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  sendDoppler(inscripcionMongoId) {
    const table = this.tokenService.getTableInformation();
    const organismo = this.tokenService.getOrganismo();
    const titleCourse = this.tokenService.getTitleInscription();

    /* Info del Formulario */
    const nombre = this.formResult.nombre;
    const apellido = this.formResult.apellido;
    const email = this.formResult.email;

    console.log('inscripcionMongoId :>> ', inscripcionMongoId);

    if (email) {
      let dopplerDto: DopplerDTO;
      dopplerDto = {
        correoId: this.infoInscripcion.correo.id,
        curso: titleCourse,
        instancia: this.instanciaSedeInfo.instanciaNombre,
        instanciaSede: this.instanciaSedeInfo.id,
        nombre: nombre,
        apellido: apellido,
        email: email,
        inscripcionMongoId: inscripcionMongoId,
        organismo: organismo != null ? organismo : 'Sin Organismo',
        sede: this.instanciaSedeInfo.nombreSede,
        sedeDireccion: this.instanciaSedeInfo.direccionSede,
        dia: this.instanciaSedeInfo.fechaInicio,
        idInscripcion: this.infoInscripcion.id,
        horario: this.instanciaSedeInfo.horarioFormateadoDoppler,
        rutaQr: this.qrRoute,
      };

      console.log('dopplerDto :>> ', dopplerDto);
      this.dopplerService
        .sendMessageByDoppler(
          dopplerDto,
          this.infoInscripcion.correo.id,
          this.token
        )
        .subscribe(
          (response) => {},
          (error) => {
            console.log(error);
          }
        );
    }
  }

  totalInscritos(): any {
    this.formulariosService
      .getCounterByinstanciaSedeId(this.instanciaSedeInfo.id, this.token)
      .subscribe(
        (response) => {
          if (response < this.instanciaSedeInfo.cupos) {
            this.save();
          } else {
            this.message = 'Se ha llenado la inscripción';
            this.error = true;
            this.spinnerService.hide();
          }
        },
        (error) => {
          this.spinnerService.hide();
          console.log(error);
        }
      );
  }

  isInscrito(): any {
    this.spinnerService.show();
    const codeInscription = this.tokenService.getCodeInscription();

    this.formulariosService
      .getCountByCuilAndIdInstanciaSedeId(
        this.formResult.cuil,
        this.instanciaSedeInfo.id,
        this.token
      )
      .subscribe(
        (response) => {
          if (response > 0) {
            this.message = 'Ya está INSCRIPTO';
            this.error = true;
            this.spinnerService.hide();
          } else {
            this.cuposCiudadano(
              codeInscription,
              this.formResult.cuil,
              this.token
            );
          }
        },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }

  cuposCiudadano(id: any, cuil: any, token: any): any {
    this.formulariosService
      .getResultsByCuilAndIdInscripcion(cuil, id, token)
      .subscribe(
        (response) => {
          if (response < this.cantidadCuposUsuario) {
            this.totalInscritos();
          } else {
            this.message = 'Ya utilizaste todos tus cupos disponibles';
            this.error = true;
            this.spinnerService.hide();
          }
        },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }

  base64toFile(base64String, filename) {
    // Obtener la cabecera y el cuerpo de la cadena base64
    const parts = base64String.split(';base64,');
    const type = parts[0].split(':')[1];
    const body = atob(parts[1]);

    // Convertir el cuerpo en una matriz de bytes
    const byteArray = new Uint8Array(body.length);
    for (let i = 0; i < body.length; i++) {
      byteArray[i] = body.charCodeAt(i);
    }

    // Crear y devolver el archivo
    return new File([byteArray], filename, { type: type });
  }

  defineDays() {
    let daysOfWeek = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo',
    ];

    const diasSeleccionadosArr = Object.keys(this.instanciaSedeInfo).filter(
      (dia) => daysOfWeek.includes(dia) && this.instanciaSedeInfo[dia] === 1
    );

    if (diasSeleccionadosArr.length === 7) {
      this.ClassDays = 'Todos los días';
    } else {
      this.ClassDays = diasSeleccionadosArr.join(', ');
    }
  }
}

function formatHorariosToString(horarios) {
  let result = '';

  for (const horario of horarios) {
    result += `${horario.dias}\n`;
  }

  result += ' '; // Add a blank space between the two sets of data

  for (const horario of horarios) {
    result += `${horario.horarioFormateado}\n`;
  }

  return result.trim(); // Remove trailing newline and leading blank space
}

function formatHorariosToStringBoti(horarios) {
  let result = '';

  for (const horario of horarios) {
    result += `${horario.dias} `;
  }

  result += ' '; // Add a blank space between the two sets of data

  for (const horario of horarios) {
    result += `${horario.horarioFormateado} `;
  }

  return result.trim(); // Remove trailing newline and leading blank space
}

function formatHorariosToStringDoppler(horarios) {
  // format the horarios in table with two columns one column for days and other for hours
  let result = '';
  let items = [];
  let table = `<table style="width:100%; border: 0px solid black; border-collapse: collapse;">`;
  for (const horario of horarios) {
    table += `<tr style="border: 0px solid black; border-collapse: collapse;">`;
    table += `<td style="border: 0px solid black; border-collapse: collapse;">${horario.dias}</td>`;
    table += `<td style="border: 0px solid black; border-collapse: collapse;">${horario.horario}</td>`;
    //   items.push(horario.dias.trim() + " " + horario.horario.trim());
    table += `</tr>`;
  }

  return table;
}
