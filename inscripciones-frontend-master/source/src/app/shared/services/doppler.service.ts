import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DopplerDTO } from '../models/dopplerDTO';
import { AppConfigService } from '@providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class DopplerService{

  constructor(private http: HttpClient, private configService: AppConfigService,) {}

  private backendCiudadanoEscritura: string = this.configService.getConfig().backendCiudadanoEscritura;

  public sendMessageByDoppler(dopplerInfo: DopplerDTO): Observable<any>{

    const objectHeaders = {
      'Skip-Authorization': 'true'
    };

    return this.http.post<any>(`${this.backendCiudadanoEscritura}/v1/doppler`, dopplerInfo, { headers: new HttpHeaders(objectHeaders) })
  }
}
