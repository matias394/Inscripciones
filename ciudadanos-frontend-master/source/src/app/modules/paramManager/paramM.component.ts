import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MibaServices } from '@shared/services/miba.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { InscripcionesService } from '@shared/services/inscripciones.service';
import { LoginService } from '@shared/services/login.service';
import { HeaderService } from '@components/header/header.service';

@Component({
  selector: 'app-paramM',
  templateUrl: './paramM.component.html',
  styleUrls: ['./paramM.component.scss'],
})
export class ParamMComponent implements OnInit {
  public isLoginMiba: boolean;
  public tokenJWT: string;

  constructor(
    public mibaServices: MibaServices,
    public route: ActivatedRoute,
    public router: Router,
    public tokenService: TokenStorageService,
    public mibaService: MibaServices,
    public inscripcionService: InscripcionesService,
    public cookieService: CookieService,
    public loginService: LoginService,
    public headerService: HeaderService
  ) {}

  ngOnInit() {
    let materia = this.route.snapshot.paramMap.get('codigo');
    let codeList = materia.split('_');
    this.tokenService.saveCodeInscription(codeList);

    /* Generar Token JWT */
    this.loginService.login().subscribe((response) => {
      this.tokenService.saveJwtToken(response.token);
      this.tokenService.saveTokenInfo(response);
      let decodedToken = JSON.parse(atob(response.token.split('.')[1]));
      this.headerService.timeData(decodedToken.timeValidation);
      this.getLoginMiba(codeList[0], response.token, materia, codeList);
    });
  }

  getLoginMiba(code: any, token: any, materia: any, codeList: any) {
    this.inscripcionService
      .getLoginMibaById(code, token)
      .subscribe((response) => {
        this.tokenService.saveIsMiba(response);
        this.isLoginMiba = response;
        this.routeManagement(materia, codeList);
      });
  }

  routeManagement(materia, codeList) {
    if (materia.length >= 38) {
      if (this.isLoginMiba) {
        if (codeList != undefined) {
          window.location.href = this.mibaService.getMIBA_AuthRedirect(
            codeList[0],
            codeList[1]
          );
        } else {
          window.location.href = this.mibaService.getMIBA_AuthRedirect(
            null,
            null
          );
        }
      } else {
        this.tokenService.killMIBA();
        this.router.navigate(['auth']);
      }
    } else {
      this.router.navigate(['404']);
    }
  }
}
