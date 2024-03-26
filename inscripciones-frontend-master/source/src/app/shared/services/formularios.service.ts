import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class FormulariosService2 {

  
  
  constructor(private http: HttpClient, private configService: AppConfigService, private tokenService: TokenStorageService,) {}

  private backendCiudadanoEscritura: string = this.configService.getConfig().backendCiudadanoEscritura;
  private backendCiudadanoLectura: string = this.configService.getConfig().backendCiudadanoLectura;

    public fetchFormulario(data: any): Observable<any> {
      const objectHeaders = {
        'Skip-Authorization': 'true'
      };

      return this.http.get(`${this.backendCiudadanoLectura}/v1/formularios/getFormByIdRefMongo/${data.formId}`);
    }
    
    public sendResponse(): Observable<any> {
        return this.http.get(`formularios/sendResponse`);
    }

    public getFormByIdInscripcion(id: any): Observable<any> {
      const token = this.tokenService.getToken();

      const objectHeaders = {
        'Skip-Authorization': 'true'
      };
      return this.http.get<any>(`${this.backendCiudadanoLectura}/v1/formularios/getFormByIdInscripcion/${id}`, { headers: new HttpHeaders(objectHeaders) })
    }

    public saveCitizenResponse(body:any): Observable<any> {

      const token = this.tokenService.getToken();

      const objectHeaders = {
        'Skip-Authorization': 'true'
      };

        return this.http.post<any>(this.backendCiudadanoEscritura + `/v1/inscripciones`, body, { headers: new HttpHeaders(objectHeaders) })
    }

    public getResultsByCuilAndIdInscripcion(cuil:any, idInscripcion: any): Observable<any> {
      return this.http.get<any>(`formularios/getResultsByCuilAndIdInscripcion/${cuil}/${idInscripcion}`)
    }

    public getCounterByInscriptionId(idInscripcion: any): Observable<any> {
      return this.http.get<any>(`formularios/getCounterByinscripcionId/${idInscripcion}`)
    }

    public getCounterByInstancianId(idInstancia: any): Observable<any> {
      return this.http.get<any>(`formularios/getCounterByinstanciaId/${idInstancia}`)
    }

    public getResultsByCuilAndIdInstancia(cuil:any, idInstancia: any): Observable<any> {
      return this.http.get<any>(`formularios/getResultsByCuilAndIdInstancia/${cuil}/${idInstancia}`)
    }

    public getFormById(id: any): Observable<any> {
      const objectHeaders = {
        'Skip-Authorization': 'true'
      };

      return this.http.get(`${this.backendCiudadanoLectura}/v1/formularios/getFormByIdRefMongo/${id}`, { headers: new HttpHeaders(objectHeaders) });
    }

    public getResultsByCuilAndIdInstanciaSedeId(cuil:string, idInstanciaSede: number): Observable<any> {

      const token = this.tokenService.getToken();

      const objectHeaders = {
        'Skip-Authorization': 'true'
      };
      return this.http.get<any>(
        this.backendCiudadanoEscritura +
          `/v1/formularios/getResultsByCuilAndIdInstanciaSedeId/${cuil}/${idInstanciaSede}`,
          { headers: new HttpHeaders(objectHeaders) }
      )
    }

    public getCounterByinstanciaSedeId(idInstanciaSede: any): Observable<any> {
      return this.http.get<any>(`formularios/getCounterByinstanciaSedeId/${idInstanciaSede}`)
    }

}
