import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})

export class QrService {

  constructor(private http: HttpClient, private configService: AppConfigService, private tokenService: TokenStorageService,) { }

  private backendServiciosExternos: string = this.configService.getConfig().backendServiciosExternos;

  public getQR(userInfo: any, token: any): Observable<any> {
    const objectHeaders = {
      'Skip-Authorization': 'true'
    };

    return this.http.post(`${this.backendServiciosExternos}/api/qr/getQr`,
      userInfo,
      {
        headers: new HttpHeaders(objectHeaders),
        responseType: 'text',
      }
    );
  }
}
