import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public nombre: string;
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.nombre = this.tokenStorage.getUser().nombre;
  }

  ngOnInit() {}

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

  onToggleMenuSidebar() {}

  onToggleControlSidebar() {}
}
