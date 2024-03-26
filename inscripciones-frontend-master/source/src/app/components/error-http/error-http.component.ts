import { Component, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';
import { ErrorHTTPService } from './error-http.service';

@Component({
  selector: 'app-error-http',
  template: `<div class="alert-wrapper" *ngIf="show">
    <div role="alert" class="alert-div alert-danger">
      <p class="alert-text">{{ message }}</p>
      <button type="button" class="close alert-close" data-dismiss="alert">
        &times;
      </button>
    </div>
  </div>`,
  styleUrls: ['./error-http.component.css'],
})
export class ErrorHTTPComponent {
  alert$ = this.errorHTTPService.alert$;
  public show: boolean = false;
  public message: string = '';

  constructor(private readonly errorHTTPService: ErrorHTTPService) {}

  ngOnInit(): void {
    this.alert$.subscribe((res: any) => {
      this.show = res.show;
      this.message = res.message;
      const timeout = timer(res.time);
      if (this.show) {
        timeout.subscribe(() => {
          this.errorHTTPService.closeAlert();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.alert$.unsubscribe();
  }
}
