import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { InstanciaSedeService } from '@shared/services/instanciaSede.service';

@Component({
  selector: 'app-qr-modal',
  template: `<div class="modal d-block mt-5" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <zxing-scanner
              [enable]="scannerEnabled"
              [device]="myDevice"
              (scanError)="scannerError($event)"
              (camerasFound)="camerasFoundHandler($event)"
              (scanSuccess)="scanSuccessHandler($event)"
            >
            </zxing-scanner>
          </div>
          <div class="modal-footer">
            <button
              style="width: 100%"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              (click)="closeModal()"
            >
              Cancelar
            </button>
          </div>
        </div>
        <div></div>
        <div *ngIf="error">
          <div class="modal d-block mt-8" tabindex="-1" role="dialog">
            <div
              class="modal-dialog modal-sm"
              role="document"
              style="margin-top: 70%"
            >
              <div class="modal-content">
                <div class="modal-body" style="text-align: center">
                  <p>{{ message }}</p>
                </div>
                <div class="modal-footer" style="justify-content:center">
                  <button
                    style="background-color: red; border-color: red"
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    (click)="closeAlert()"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div data-dismiss="modal" class="modal-backdrop show"></div>
        </div>
      </div>
    </div>
    <div data-dismiss="modal" class="modal-backdrop show"></div>`,
  styleUrls: ['./qr-modal.component.scss'],
})
export class QrModalComponent implements OnInit {
  @Output() triggerCancel: EventEmitter<any> = new EventEmitter();
  public scannerEnabled = true;
  public results: string[] = [];
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;
  public dias: any;
  public filterClass: any;
  public error: boolean = false;
  public message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private instanciaSedeService: InstanciaSedeService
  ) {}

  closeModal(): void {
    this.triggerCancel.emit();
  }

  closeAlert(): void {
    this.error = false;
  }

  ngOnInit(): void {}

  scannerError(event: any) {
    console.log(event);
  }

  scanSuccessHandler(event: string) {
    const parsedJson = JSON.parse(event);
    this.instanciaSedeService
      .validateStudentByClassIdAndCuil(
        parsedJson.instanciaSedeId,
        parsedJson.cuil
      )
      .subscribe(
        (response) => {
          if (response.status == 200) {
            this.classDays(response.instanciaSede);
            const userInformation = {
              id: response.alumnoId,
              nombre: parsedJson.name,
              apellido: parsedJson.lastName,
              cuil: parsedJson.cuil,
              sede: response.instanciaSede.sede.nombre,
              instancia: response.instanciaSede.instancia.nombre,
              clase: response.instanciaSede.clase,
              horario:
                response.instanciaSede.horaInicio +
                ' a ' +
                response.instanciaSede.horaFin,
              fechaInicio: response.instanciaSede.clase[0].fecha,
              dias: this.dias,
              modalidad: response.instanciaSede.instancia.modalidad.nombre,
            };
            this.tokenStorageService.saveQrInformation(userInformation);
            this.router.navigate(['confirmacion']);
          } else if (response.status == 404) {
            this.error = true;
            this.message = 'El alumno no tiene clases el día de hoy';
          } else if (response.status == 500) {
            this.error = true;
            this.message = 'El alumno no se encuentra en el sistema';
          }
        },
        (error) => {
          console.log('Hubo un error: ' + error);
        }
      );
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    this.selectCamera(this.cameras[0].label);
  }

  selectCamera(cameraLabel: string) {
    this.cameras.forEach((camera) => {
      if (camera.label.includes(cameraLabel)) {
        this.myDevice = camera;
        this.scannerEnabled = true;
      }
    });
  }

  classDays(instanciaSede: any) {
    let daysOfWeek = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo',
    ];
    const diasSeleccionadosArr = Object.keys(instanciaSede).filter(
      (dia) => daysOfWeek.includes(dia) && instanciaSede[dia] === 1
    );
    if (diasSeleccionadosArr.length === 7) {
      this.dias = 'Todos los días';
    } else {
      this.dias = diasSeleccionadosArr.join(', ');
    }
  }
}
