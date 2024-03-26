import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-responsive-reportes',
  templateUrl: './card-responsive-reportes.component.html',
  styleUrls: ['./card-responsive-reportes.component.scss'],
})
export class CardResponsiveReportesComponent {
  @Input() data: any;
  @Input() messageButton: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute) {}
}
