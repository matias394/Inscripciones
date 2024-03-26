import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MibaServices } from '@shared/services/miba.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { InscripcionesService } from '@shared/services/inscripciones.service';
import { HeaderService } from '@components/header/header.service';
import { HomeService } from '../home/home.service';
import { LoginService } from '@shared/services/login.service';

@Component({
  selector: 'app-authMiba',
  templateUrl: './authMiba.component.html',
  styleUrls: ['./authMiba.component.scss'],
})
export class AuthMibaComponent implements OnInit {
  public nombre: string = '';
  public apellido: string = '';
  public cuil: string = '';
  public dni: string = '';
  public isTemporalToken: string;

  constructor(
    public mibaServices: MibaServices,
    public route: ActivatedRoute,
    public router: Router,
    public tokenService: TokenStorageService,
    public inscripcionService: InscripcionesService,
    public headerService: HeaderService,
    public homeService: HomeService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    let codeList = [];
    this.isTemporalToken = this.tokenService.getJwtToken();
    this.route.queryParams.subscribe((params) => {
      if (params['code']) {
        let tokenInformation = this.tokenService.getTokenInfo();
        let decodedToken = JSON.parse(
          atob(tokenInformation.token.split('.')[1])
        );
        this.headerService.timeData(decodedToken.timeValidation);
        if (params['state']) {
          codeList = params['state'].split(' ');
          this.getTokenMiba(params['code'], codeList, this.isTemporalToken);
        } else {
          this.getTokenMiba(params['code'], undefined, this.isTemporalToken);
        }
      } else {
        const codigo = this.tokenService.getCodeInscription();
        const hash = this.tokenService.getTuitionInscription();
        codeList.push(codigo, hash);
        this.authCourse(codeList, null, this.isTemporalToken);
      }
    });
  }

  getTokenMiba(code: any, codeList: any, token: any) {
    this.mibaServices.getTokenMiba(code, token).subscribe(
      (tokenResponse) => {
        this.tokenService.saveToken(tokenResponse.access_token);
        this.tokenService.saveRefreshToken(tokenResponse.refresh_token);
        if (codeList != undefined) {
          this.authCourse(codeList, tokenResponse.access_token, token);
        } else {
          this.getUserInfo(tokenResponse.access_token, token);
        }
      },
      (error) => {
        console.log(error);
        window.location.href = this.mibaServices.getMIBA_AuthRedirect(
          null,
          null
        );
      }
    );
  }

  getUserInfo(code: any, token: any) {
    this.mibaServices.getMIBAUserInfo(code, token).subscribe(
      (resp) => {
        /* Header Name */
        this.headerService.headerData(resp.nombre + ' ' + resp.apellido);
        this.tokenService.saveUserInformation(resp);
        this.router.navigate(['inicio']);
      },
      (error) => {
        console.log(error);
        window.location.href = this.mibaServices.getMIBA_LogoutRedirect();
      }
    );
  }

  authCourse(codeList, token, tokenApp) {
    this.inscripcionService
      .matriculaAuth(codeList[0], codeList[1], tokenApp)
      .subscribe(
        (response) => {
          this.tokenService.saveCodeInscription(codeList);
          this.getInscriptionInformation(codeList, tokenApp);
          this.notification(codeList, tokenApp);
          if (this.tokenService.getIsMiba() === '1') {
            this.getUserInfo(token, tokenApp);
          } else {
            this.router.navigate(['inicio']);
          }
        },
        (error) => {
          console.log(error);
          window.location.href = this.mibaServices.getMIBA_LogoutRedirect();
        }
      );
  }

  notification(codeList, token) {
    this.inscripcionService.getNotificationById(codeList[0], token).subscribe(
      (response) => {
        this.tokenService.saveNotificationNumber(response.id);
      },
      (error) => {
        console.log(error);
        window.location.href = this.mibaServices.getMIBA_LogoutRedirect();
      }
    );
  }

  getInscriptionInformation(codeList, token) {
    this.inscripcionService.getInscripcionById(codeList[0], token).subscribe(
      (response) => {
        this.tokenService.saveOrganismo(
          response.organismoCategoria.organismo.nombre
        );
        this.homeService.titleData(response.nombre);
        this.tokenService.saveTitleInscription(response.nombre);
        this.tokenService.saveReturnURL(response.retornoUrl);
      },
      (error) => {
        console.log(error);
        window.location.href = this.mibaServices.getMIBA_LogoutRedirect();
      }
    );
  }
}
