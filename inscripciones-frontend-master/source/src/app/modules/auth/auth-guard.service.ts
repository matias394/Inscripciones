import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ErrorHTTPService } from '@components/error-http/error-http.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public tokenService: TokenStorageService,
    public router: Router,
    private readonly errorService: ErrorHTTPService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['login']);
      return false;
    }

    const dataExp = this.tokenService.getUser().exp * 1000;
    const currentDate = new Date().getTime();
    // console.log('time', dataExp, currentDate);

    // if (dataExp < currentDate) {
    //   this.tokenService.signOut();
    //   this.errorService.showAlert(401, 7000);
    //   this.router.navigate(['login']);
    //   return false;
    // }

    // Verificacion de rol correspondiente a la ruta
    const expectedRole = route.data['expectedRole'];
    const rol = this.tokenService.getUser().rol; // Rol del JWT

    if (expectedRole && rol !== expectedRole) {
      this.router.navigate(['login']);
    }

    return true;
  }
}
