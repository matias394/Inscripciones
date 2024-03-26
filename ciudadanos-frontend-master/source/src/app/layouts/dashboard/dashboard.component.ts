import { Component, OnInit } from '@angular/core';
import { MibaServices } from '@shared/services/miba.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private mibaServices: MibaServices) {}

  ngOnInit(): void {}
}
