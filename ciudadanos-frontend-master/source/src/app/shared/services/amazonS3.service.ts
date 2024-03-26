import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class AmazonS3Service {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public getAmazonFile(fileName: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendClient + `/v1/amazonS3/${fileName}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public saveAmazonFile(formData: any, token: any): Observable<string> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(
      this.config.getConfig().backendCiudadanoEscritura + `/v1/amazonS3`,
      formData,
      {
        headers: new HttpHeaders(objectHeaders),
        responseType: 'text',
      }
    );
  }
}
