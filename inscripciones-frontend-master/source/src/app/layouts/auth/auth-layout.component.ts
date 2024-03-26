import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {}

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
