import { of, take } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AppConfigService } from '@providers/app-config.service';
import { QrService } from '@shared/services/qr.service';
import { BodyBotiDto } from '@shared/models/bodyBotiDto';
import { DopplerDTO } from '@shared/models/dopplerDTO';
import { AmazonS3Service } from '@shared/services/amazonS3.service';
import { BotiService } from '@shared/services/boti.service';
import { DopplerService } from '@shared/services/doppler.service';
import { FormulariosService2 } from '@shared/services/formularios.service';

@Component({
  selector: 'app-formulario-confirmar',
  templateUrl: './formulario-confirmar.component.html',
  styleUrls: ['./formulario-confirmar.component.scss'],
})
export class FormularioConfirmarComponent {
  public isAlert: boolean = false;
  public correct: boolean = false;
  public errorMessage: boolean = false;
  public errorFound: boolean = false;
  public formResult: any;
  public formId: string = '';
  public inscripcionId: string;
  public instanciaId: string;
  public error: boolean = false;
  public message: string;
  public resultSaved: boolean = false;
  public cuil: string;
  public cantidadCuposUsuario: number = 0;
  public cantidadCuposInscripcion: number = 0;
  public infoInscripcion: any = null;
  public name: string;
  public lastname: string;
  public instancia: any;
  public inscripcion: any;
  public title: string;
  public sede: string;
  public fechaInicio: string;
  public days: string;
  public horario: string;
  public horarioFormateadoBoti: string;
  public horarioFormateadoDoppler: string;
  public modalidad: string;
  public botiKey: string;
  public instanciaSede: any;
  public classDays: string;
  public qrRoute: string;

  constructor(
    private formulariosService: FormulariosService2,
    private route: ActivatedRoute,
    private dopplerService: DopplerService,
    private amazonS3Service: AmazonS3Service,
    private botiService: BotiService,
    private qrService: QrService,
    private tokenService: TokenStorageService,
    private router: Router,
    private config: AppConfigService
  ) {
    this.botiKey = this.config.getConfig().boti_key;
  }

  ngOnInit(): void {
    this.formResult = this.tokenService.getForm();
    // this.instancia = this.tokenService.getInstancia();
    this.inscripcion = this.tokenService.getInscription();
    this.formId = this.tokenService.getFormId();
    /* Construyendo datos de la tabla */
    this.instanciaSede = this.tokenService.getInstanciaSede();
    this.defineDays();
    this.title = this.instanciaSede.nombreInscripcion;
    this.sede = this.instanciaSede.nombreSede;
    this.modalidad = this.instanciaSede.modalidad;
    this.horario =
      this.instanciaSede.horaInicio + ' a ' + this.instanciaSede.horaFin;
    this.fechaInicio = this.instanciaSede.fechaInicio;
    this.name = this.formResult.nombre;
    this.lastname = this.formResult.apellido;
    /*******************************/
    this.instanciaId = this.instanciaSede.idInstancia;
    this.inscripcionId = this.instanciaSede.idInscripcion;

    this.horario = this.formatHorariosToString(
      this.instanciaSede.horarios
    );

    this.horarioFormateadoBoti = this.formatHorariosToStringBoti(
      this.instanciaSede.horarios
    );
    this.horarioFormateadoDoppler =
      this.formatHorariosToStringDoppler(this.instanciaSede.horarios);
  }

  closeAlert() {
    this.isAlert = false;
  }

  formatHorariosToString(horarios) {
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

  formatHorariosToStringBoti(horarios) {
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

  formatHorariosToStringDoppler(horarios) {
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

  saveCitizen(token: string) {
    this.formResult.archivo = null;
    let body = {
      inscripcionId: this.instanciaSede.idInscripcion,
      instanciaId: this.instanciaSede.idInstancia,
      instanciaSedeId: this.instanciaSede.id,
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
        let inscripcionMongoId = response._id;
        this.resultSaved = true;
        const notifyType = this.inscripcion.notificacion;
        switch (notifyType) {
          case 1:
            this.sendDoppler(inscripcionMongoId);
            break;
          case 2:
            this.sendBoTI();
            break;
          case 3:
            this.sendBoTI();
            this.sendDoppler(inscripcionMongoId);
            break;
        }

        if (this.resultSaved) {
          this.correct = true;
          setTimeout(() => {
            this.router.navigate(['gestion']);
          }, 2000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sendBoTI() {
    /* Info del Formulario */
    var areaCode;
    var telefono = this.formResult.telefono;
    if (telefono) {
      var validatorPhone = telefono.codigoarea.toString().substr(0, 1);
      if (validatorPhone != '9') {
        areaCode = '9' + telefono.codigoarea.toString();
      } else {
        areaCode = telefono.codigoarea.toString();
      }
      var telefonoFormat =
        telefono.codigopais + areaCode + telefono.numerotelefono;

      if (telefonoFormat) {
        let botiDTO: BodyBotiDto;
        botiDTO = {
          chatPlatform: 'Whatsapp',
          chatChannelNumber: '5491150500147',
          platformContactId: telefonoFormat,
          ruleNameOrId: "sac08push03",
          clientPayload: 'optional',
          params: {
            auxiliar: this.name + ' ' + this.lastname,
            auxiliar1: this.instanciaSede.nombreInscripcion,
            auxiliar2: this.instanciaSede.fechaInicio,
            auxiliar3: this.horarioFormateadoBoti,
            auxiliar4: this.instanciaSede.nombreSede,
            auxiliar5: this.formResult.cuil,
            auxiliar6: this.instanciaSede.id,
          },
        };
        this.botiService.sendBotiMessage(botiDTO, this.tokenService.getToken()).subscribe(
          (response) => {},
          (error) => {
            console.log(error);
          }
        );
      }
    }
    return of(null);
  }

  sendDoppler(inscripcionMongoId) {
    // const table = this.tokenService.getInstancia();
    const organismo = null;
    const titleCourse = this.tokenService.getInscription().nombre;

    /* Info del Formulario */
    var nombre = this.formResult.nombre;
    var apellido = this.formResult.apellido;
    var email = this.formResult.email;

    if (email) {
      let dopplerDto: DopplerDTO;
      dopplerDto = {
        correoId: this.inscripcion.correo,
        curso: titleCourse,
        instancia: this.instanciaSede.instanciaNombre,
        inscripcionMongoId: inscripcionMongoId,
        nombre: nombre,
        apellido: apellido,
        email: email,
        organismo: organismo != null ? organismo : 'Sin Organismo',
        sede: this.instanciaSede.nombreSede,
        dia: this.fechaInicio,
        idInscripcion: this.instanciaSede.idInscripcion,
        horario: this.horarioFormateadoDoppler,
        instanciaSede: this.instanciaSede.id,
        sedeDireccion: this.instanciaSede.direccionSede,
        rutaQr: this.qrRoute,
      };

      console.log('dopplerDto :>> ', dopplerDto);
      this.dopplerService
        .sendMessageByDoppler(dopplerDto)
        .subscribe(
          (response) => {},
          (error) => {
            console.log(error);
          }
        );
    }
    return of(null);
  }

  sendAmazonS3() {
    if (this.formResult.archivo != null) {
      const fileForm = this.formResult.archivo;
      const fileName = fileForm.nombre;
      const base64 = fileForm.content;
      const file = this.base64toFile(base64, fileName);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('codIdentificador', fileName);
      formData.append('cuil', this.formResult.cuil);
      formData.append('inscripcion', this.inscripcion.id);
      formData.append('instancia', this.instanciaSede.id);
      this.amazonS3Service.saveAmazonFile(formData).subscribe(
        (response) => {
          this.saveCitizen(this.tokenService.getToken());
        },
        (error) => {
          console.log('Error del documento:', error);
        }
      );
    } else {
      this.saveCitizen(this.tokenService.getToken());
    }
  }

  save() {
    const userInfo = {
      name: this.formResult.nombre,
      lastName: this.formResult.apellido,
      cuil: this.formResult.cuil,
      instanciaSedeId: this.instanciaSede.id,
    };
    /** Generate QR **/
    this.qrService.getQR(userInfo, this.tokenService.getToken()).subscribe(
      (response) => {
        const jsonResponse = JSON.parse(response);
        this.qrRoute = jsonResponse.url;
        this.sendAmazonS3();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  totalInscritos(): any {
    this.formulariosService
      .getCounterByinstanciaSedeId(this.instanciaSede.id)
      .subscribe(
        (response) => {
          if (response < this.instanciaSede.cupos) {
            this.save();
          } else {
            this.message = 'Se ha llenado la inscripción';
            this.error = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  isInscrito(): any {
    this.formulariosService
      .getResultsByCuilAndIdInstanciaSedeId(
        this.formResult.cuil,
        this.instanciaSede.id
      )
      .subscribe(
        (response) => {
          if (response != null) {
            this.message = 'Ya está INSCRIPTO';
            this.error = true;
          } else {
            this.cuposCiudadano(this.inscripcionId, this.formResult.cuil);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cuposCiudadano(id: any, cuil: any): any {
    this.formulariosService
      .getResultsByCuilAndIdInscripcion(cuil, id)
      .subscribe((response) => {
        if (response.length < 1) {
          this.totalInscritos();
        } else {
          this.message = 'Ya utilizaste todos tus cupos disponibles';
          this.error = true;
        }
      });
  }

  base64toFile(base64String, filename) {
    const parts = base64String.split(';base64,');
    const type = parts[0].split(':')[1];
    const body = atob(parts[1]);
    const byteArray = new Uint8Array(body.length);
    for (let i = 0; i < body.length; i++) {
      byteArray[i] = body.charCodeAt(i);
    }
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

    const diasSeleccionadosArr = Object.keys(this.instanciaSede).filter(
      (dia) => daysOfWeek.includes(dia) && this.instanciaSede[dia] === 1
    );

    if (diasSeleccionadosArr.length === 7) {
      this.classDays = 'Todos los días';
    } else {
      this.classDays = diasSeleccionadosArr.join(', ');
    }
  }
}
