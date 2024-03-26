import { Component, HostListener, OnInit } from '@angular/core';
import { MibaServices } from '@shared/services/miba.service';
import { HeaderService } from './header.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { LoginService } from '@shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public usuario: any;
  public activityTime: number;
  public tokenTime: number;
  public intervalId: any;
  public tokenActivo: any;
  public timeValidation: number;

  constructor(
    private mibaServices: MibaServices,
    private headerService: HeaderService,
    private tokenService: TokenStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.headerService.time.subscribe((time) => {
      this.timeValidation = parseInt(time);
      this.activityTime = parseInt(time) * 60;
      this.tokenTime = (parseInt(time) - 1) * 60;
      this.timer();
      this.timerToken();
    });
    if (this.tokenService.getIsMiba() === '1') {
      this.headerService.change.subscribe((fullname) => {
        this.usuario = fullname;
      });
      if (this.tokenService.getUserInformation != undefined) {
        this.usuario =
          this.tokenService.getUserInformation().nombre +
          ' ' +
          this.tokenService.getUserInformation().apellido;
      }
    }
  }

  logout() {
    window.location.href = this.mibaServices.getMIBA_LogoutRedirect();
  }

  timer() {
    this.intervalId = setInterval(() => {
      this.activityTime--;
      if (this.activityTime === 0) {
        clearInterval(this.intervalId);
        this.logout();
      }
    }, 1000);
  }

  timerToken() {
    let token = this.tokenService.getJwtToken();
    this.intervalId = setInterval(() => {
      this.tokenTime--;
      if (this.tokenTime === 0) {
        clearInterval(this.intervalId);
        /** Refresh Token **/
        this.loginService.refreshToken(token).subscribe((response) => {
          this.tokenService.saveJwtToken(response.token);
          this.tokenTime = (this.timeValidation - 1) * 60;
          this.timerToken();
        });
      }
    }, 1000);
  }

  @HostListener('document:mousemove', ['$event'])
  setTime() {
    this.activityTime = this.timeValidation * 60;
  }
}
