import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';

@Injectable({
  providedIn: 'root',
})
export class FormulariosService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }
}
