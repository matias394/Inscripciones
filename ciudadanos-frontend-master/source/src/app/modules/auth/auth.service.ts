import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { MibaServices } from '@shared/services/miba.service';
import { mibaDTO } from '@shared/models/mibaDto';
// import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
}
