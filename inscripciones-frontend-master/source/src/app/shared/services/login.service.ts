import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private Url;
  private spinnerActive: Subject<boolean> = new Subject<boolean>();
  public spinnerActiveObs = this.spinnerActive.asObservable();

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.Url = this.configService.getConfig().baseUrl;
  }

  public login(data: any): Observable<any> {
    const headers = new HttpHeaders({});
    const formdata = new FormData();
    formdata.append('cuil', data.cuil);
    formdata.append('password', data.password);
    return this.http.post<any>(`${this.Url}login`, formdata, { headers });
  }
}
