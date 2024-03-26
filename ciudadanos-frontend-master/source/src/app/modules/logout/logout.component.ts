import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MibaServices } from '@shared/services/miba.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    public mibaServices: MibaServices,
    public route: ActivatedRoute,
    public router: Router,
    public tokenService: TokenStorageService,
    public mibaService: MibaServices
  ) {}

  ngOnInit() {
    this.tokenService.signOut();
    window.location.href = this.mibaService.getMIBA_AuthRedirect(null, null);
  }
}
