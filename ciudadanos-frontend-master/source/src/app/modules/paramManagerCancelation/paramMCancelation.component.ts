import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { LoginService } from '@shared/services/login.service';
import { HeaderService } from '@components/header/header.service';

@Component({
  selector: 'app-paramM-cancelation',
  templateUrl: './paramMCancelation.component.html',
  styleUrls: ['./paramMCancelation.component.scss'],
})
export class ParamMCancelationComponent implements OnInit {
  public isLoginMiba: boolean;
  public tokenJWT: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public tokenService: TokenStorageService,
    public loginService: LoginService,
    public headerService: HeaderService
  ) {}

  ngOnInit() {
    // /* Generar Token JWT */
    this.loginService.login().subscribe((response) => {
      this.tokenService.saveJwtToken(response.token);
      this.tokenService.saveTokenInfo(response);
      let decodedToken = JSON.parse(atob(response.token.split('.')[1]));
      this.headerService.timeData(decodedToken.timeValidation);

      let idInscripcion = this.route.snapshot.paramMap.get('idInscripcion');
      console.log('idInscripcion :>> ', idInscripcion);
      let urlRedirect = 'cancelar/' + idInscripcion;
      this.router.navigate([urlRedirect]);
    });
  }
}
