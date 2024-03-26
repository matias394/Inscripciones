import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ElasticService {

constructor(private http: HttpClient) {}

    public syncElasticSearch(size: any): Observable<any> {
        return this.http.post(`migracion/elastidsearch?loteSize=${size}`, "", {
            responseType: 'text',
          });
    }

    public syncMongoUsers(size: any): Observable<any> {
      return this.http.get(`formularios/syncMongoData?loteSize=${size}`);
  }
}
