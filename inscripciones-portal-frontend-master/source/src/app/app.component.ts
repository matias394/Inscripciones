import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { TokenStorageService } from './services/token-storage.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'portal_frontend';

  constructor(
    public loginService: LoginService,
    public tokenService: TokenStorageService,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    if (!this.tokenService.getJwtToken())
      this.loginService.login().subscribe((response) => {
        this.tokenService.saveJwtToken(response.token);
        this.tokenService.saveTokenInfo(response);
        let decodedToken = JSON.parse(atob(response.token.split('.')[1]));
      });
  }
}
