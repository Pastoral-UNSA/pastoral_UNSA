import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RegistroEstudiante from '../interfaces/registroEstudiante';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrl = 'https://unsapastoralbff.fly.dev/carreras';

  constructor(private http: HttpClient) { }

  getCarreras(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {});
  }
}