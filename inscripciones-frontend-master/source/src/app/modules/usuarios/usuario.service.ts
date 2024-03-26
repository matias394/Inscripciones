import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuarioDto } from '@shared/models/usuarioDto';
import { AppConfigService } from '@providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private Url;
  private spinnerActive: Subject<boolean> = new Subject<boolean>();
  public spinnerActiveObs = this.spinnerActive.asObservable();

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.Url = this.configService.getConfig().baseUrl;
  }

  public getUsuarios(
    page: number,
    size: number,
    searchTerm?: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(
      this.Url +
        `usuarios?page=${page}&size=${size}` +
        '&sort=id,desc' +
        `&filter=${searchTerm}`,
      { headers }
    );
  }

  public putUsuario(usuarioDto: usuarioDto): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(this.Url + 'usuarios', usuarioDto, {
      headers,
    });
  }

  public postUsuario(usuarioDto: usuarioDto): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.Url + 'usuarios', usuarioDto, {
      headers,
    });
  }

  public getUsuarioById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(this.Url + 'usuarios/' + id, { headers });
  }

  public deleteUsuarioById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.delete<any>(this.Url + 'usuarios/' + id, { headers });
  }

  public getUsuarioByCuil(cuil: string): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(this.Url + 'usuarios/cuil/' + cuil, { headers });
  }
}
