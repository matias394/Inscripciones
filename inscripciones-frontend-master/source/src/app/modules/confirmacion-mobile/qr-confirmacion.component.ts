import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsistenciasService } from '../usuario-profesor/asistencias/asistencias.service';

@Component({
  selector: 'app-qr-confirmacion',
  templateUrl: './qr-confirmacion.component.html',
  styleUrls: ['./qr-confirmacion.component.scss'],
})
export class QRConfirmarComponent implements OnInit {
  public qrInfo: any;
  public days: any;
  public information: any;
  public classId: any;
  public message: string;
  public modal: boolean = false;
  public error: boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private asistenciaService: AsistenciasService
  ) {}

  ngOnInit(): void {
    this.information = this.tokenStorageService.getQrInformation();
  }

  close() {
    this.router.navigate(['../']);
  }

  confirmAssitance() {
    if (this.classId != undefined) {
      this.asistenciaService
        .putAsistenciaUser(this.classId, this.information.id, 1)
        .subscribe(
          (response) => {
            this.modal = true;
            this.message = 'Asistencia confirmada';
            setTimeout(() => {
              this.router.navigate(['../'], { relativeTo: this.route });
            }, 1000);
          },
          (error) => {
            this.error = true;
            this.message = 'Ha ocurrido un error, intentelo más tarde';
          }
        );
    } else {
      this.error = true;
      this.message = 'Por favor seleccione una clase';
    }
  }

  closeModal() {
    this.error = false;
  }
}
