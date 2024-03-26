import {
  Component,
  OnInit,
  HostListener,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

import { SharedService } from '@shared/services/shared.service';
import { RecaptchaService } from '@shared/services/recaptcha.service';

import { LoginService } from '../../../shared/services/login.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    cuil: '',
    password: '',
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showPassword: boolean = false;
  submitted: boolean = false;
  disabled: boolean = false;
  windowWidth: number;
  resizeSub: Subscription;
  maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private sharedService: SharedService,
    private recaptchaService: RecaptchaService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private loginService: LoginService,
    private windowDimensionService: WindowDimensionService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  onSubmit(form: any) {
    this.errorMessage = '';
    this.submitted = true;
    this.disabled = true;
    if (form.value.cuil.length <= 0 || form.value.password.length <= 0) {
      this.disabled = false;
      return;
    }
    this.authUser(form.value);
  }

  getInfoExtra() {
    const dataUser = this.tokenStorage.getUser();
    if (dataUser.id_rol === 2) {
      this.sharedService.getUserById(dataUser.usuario).subscribe((data) => {
        this.tokenStorage.addDataUser(data, 'dataUser');
      });
    }
    if (dataUser.id_rol === 4) {
      this.sharedService.getUserById(dataUser.usuario).subscribe((data) => {
        this.tokenStorage.addDataUser(data, 'dataUser');
      });
    }
  }

  checkSession(): void {
    this.authService.checkSession().subscribe({
      next: (data) => {},
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log('this.errorMessage :>> ', this.errorMessage);
      },
    });
  }

  goToDashboard(): void {
    this.router.navigate(['inicio']);
  }

  parseJwt(token: any): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  authUser(data: any) {
    this.loginService.login(data).subscribe(
      (response) => {
        /* Captcha verifying */
        this.getInfoRecaptcha(response.token, data.cuil);
        this.tokenStorage.saveToken(response.token);
        let parsed = this.parseJwt(response.token);
        this.tokenStorage.saveUser(parsed);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.getInfoExtra();
        setTimeout(() => {
          this.goToDashboard();
        }, 900); //FIX PARA QUE CARGUE LA INFO DEL USUARIO ANTES DE REDIRIGIR
      },
      (error) => {
        this.submitted = false;
        if (error.apiError != null || error.apiError != undefined) {
          this.errorMessage = error.apiError.message;
        } else {
          this.errorMessage = 'Usuario o Contraseña Incorrecta';
        }
        this.isLoginFailed = true;
        this.disabled = false;
      }
    );
  }

  getInfoRecaptcha(tokenUser: any, cuil: any) {
    this.recaptchaV3Service.execute('login').subscribe((token) => {
      this.recaptchaService
        .getTokenClientModule(token, tokenUser, cuil)
        .subscribe(
          (response) => {
            if (response.success) {
            } else {
              this.errorMessage = 'Error en Captcha';
              this.isLoginFailed = true;
              this.submitted = false;
              this.disabled = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }
}
