import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuardService {
  constructor(
    public tokenService: TokenStorageService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this.tokenService.getToken()) {
      this.router.navigate(['home']);
      return true;
    }

    return true;
  }
}
