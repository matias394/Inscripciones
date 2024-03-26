import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { MibaServices } from '@shared/services/miba.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public tokenService: TokenStorageService,
    public router: Router,
    public mibaService: MibaServices,
    public ruta: ActivatedRoute
  ) {}

  canActivate(): boolean {
    if (!this.tokenService.getToken() && !this.tokenService.getJwtToken()) {
      window.location.href = this.mibaService.getMIBA_AuthRedirect(null, null);
      return false;
    }
    return true;
  }
}
