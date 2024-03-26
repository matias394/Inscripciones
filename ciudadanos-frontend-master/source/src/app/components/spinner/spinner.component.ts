import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  template: ` <div class="overlay-container" *ngIf="isLoading$ | async">
    <div class="spinner">
      <div class="spinner-border text-info" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>
  </div>`,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  isLoading$ = this.spinnerService.isLoading$;

  constructor(private readonly spinnerService: SpinnerService) {}

  ngOnInit(): void {}
}
