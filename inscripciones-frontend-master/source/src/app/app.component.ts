import { Component } from '@angular/core';
import { config } from 'process';
import { AppConfigService } from '@providers/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  constructor(private config: AppConfigService) {}

  ngOnInit(): void {}
}
