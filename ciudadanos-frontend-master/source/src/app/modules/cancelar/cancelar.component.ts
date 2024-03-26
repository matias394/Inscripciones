import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CancelarService } from '@shared/services/cancelar.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.scss'],
})
export class CancelarComponent {
  constructor(
    private cancelarService: CancelarService,
    private tokenService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public inscripcionInfo: any;
  public idInscripcionMongo: string;
  private token: string;
  public cuil: string;
  public nombreInscripcion: string;
  public idInscripcion: string;
  public error: boolean = false;
  public cancelationSuccess: boolean = false;
  public message: string;

  ngOnInit(): void {
    this.token = this.tokenService.getJwtToken();
    console.log(this.token);
    this.idInscripcionMongo = String(this.router.url.split('/')[2]);
    console.log(this.idInscripcionMongo);
    this.getCancelationInformation(this.idInscripcionMongo, this.token);
  }

  getCancelationInformation(id: string, token: string) {
    this.cancelarService
      .getCancelacionInformationByMongoId(id, token)
      .subscribe((data) => {
        this.inscripcionInfo = data;

        this.cuil = data.cuil;
        this.idInscripcion = data.inscripcionId;
        this.nombreInscripcion = data.nombreInscripcion;

        if (data.canceled) {
          this.error = true;
          this.message = 'La inscripcion ya fue cancelada';
        }
      });
  }

  cancelarInscripcion() {
    this.cancelarService
      .cancelarInscripcion(this.idInscripcionMongo, this.token)
      .subscribe(
        (response) => {
          this.cancelationSuccess = true;
          // let urlRedirect = 'cancelar-exito'
          // this.router.navigate([urlRedirect]);
        },
        (error) => {
          this.error = true;
          this.message = 'La inscripcion ya fue cancelada';
        }
      );
  }
}
