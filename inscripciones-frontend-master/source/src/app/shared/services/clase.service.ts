import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  constructor(private http: HttpClient) {}

  public getInstanciaSedeById(instanciaSedeId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`clases/instancia_sede/data/${instanciaSedeId}`, { headers });
  }
}
