import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private bannerService: BannerService) {}

  navigateToHome() {
    this.router.navigate(['/']);
    this.bannerService.clearSearchInput();
  }
}
