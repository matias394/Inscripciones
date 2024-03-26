import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: any;
  public userRol: number = 0;

  constructor(private tokenStorage: TokenStorageService) {
    this.user = this.tokenStorage.getUser();
    this.userRol = this.user.id_rol;
  }

  ngOnInit(): void {}
}
