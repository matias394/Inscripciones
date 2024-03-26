import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-head',
  templateUrl: './step-head.component.html',
  styleUrls: ['./step-head.component.css'],
})
export class StepHeadComponent {
  @Input() title: string = '';
  @Input() activeStep: number = 1;
  @Input() classActiveStep;
  @Input() completedStep: number = 1;
}
