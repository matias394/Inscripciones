import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay-container" *ngIf="isLoading$ | async">
      <div class="spinner">
        <div class="spinner-border text-info" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading$ = this.spinnerService.isLoading$;

  constructor(private readonly spinnerService: SpinnerService) {}

  ngOnInit(): void {}
}
