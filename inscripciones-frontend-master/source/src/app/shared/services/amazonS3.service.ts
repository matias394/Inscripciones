import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';
@Injectable({
  providedIn: 'root',
})
export class AmazonS3Service {
  private Url;
  private backendCiudadanoEscritura;


  constructor(private http: HttpClient, private config: AppConfigService) {
    this.Url = this.config.getConfig().baseUrl;
    this.backendCiudadanoEscritura = this.config.getConfig().backendCiudadanoEscritura;
  }

  public getAmazonFile(fileInfo: any): Observable<any> {
    return this.http.post<any>(`${this.Url}amazonS3/getFile`, fileInfo);
  }

  public saveAmazonFile(amazonFileDto: any): Observable<string> {

    const objectHeaders = {
      'Skip-Authorization': 'true'
    };
    
    return this.http.post(`${this.backendCiudadanoEscritura}/v1/amazonS3`, amazonFileDto, {
      responseType: 'text',
      headers: objectHeaders
    });
  }
}
