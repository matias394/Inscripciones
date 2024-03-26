import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { of, timer, switchMap, repeat, Subscription, filter } from 'rxjs';
import { AuthService } from '@modules/auth/auth.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  subscription: Subscription;
  currentTime: any;
  refreshInterval: number = 5000;
  private _getTime: Subscription;
  private _getTimeRefresh: Subscription;
  private timeOut: number = 0;
  private timeRefresh: number = 0;
  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {
    this.timeOut = this.authService.getTimeOut().timeOut;
    this.timeRefresh = this.authService.getTimeOut().timeRefresh;
  }

  ngOnInit(): void {
    this.getTimeStart();
    this._getTimeRefresh = this.getTimeRefresh()
      .pipe(repeat())
      .subscribe(() => {
        this.authService.autoTokenRefresh().subscribe(
          (response) => {
            let token = response.token;
            this.tokenService.saveToken(token);
          },
          (error) => {
            console.log('Error refreshing token', error);
          }
        );
      });
  }

  ngOnDestroy(): void {
    this._getTime.unsubscribe();
    this._getTimeRefresh.unsubscribe();
  }

  getTimeStart() {
    this._getTime = this.getTime$.subscribe((t) => {
      this.authService.autoLogout();
    });
  }

  refreshObs() {
    return timer(this.timeOut);
  }

  getTimeRefresh() {
    return timer(this.timeRefresh);
  }

  getTime$ = of(null).pipe(
    switchMap((e) => this.refreshObs()),
    repeat()
  );

  getRefresh$ = of().pipe(
    switchMap((e) => this.getTimeRefresh()),
    repeat()
  );

  onToggleMenuSidebar() {
    return true;
  }

  @HostListener('document:mousemove', ['$event'])
  setTime() {
    this._getTime.unsubscribe();
    this.getTimeStart();
  }
}
