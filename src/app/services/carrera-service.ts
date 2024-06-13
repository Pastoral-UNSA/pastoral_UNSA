import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RegistroEstudiante from '../interfaces/registroEstudiante';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrlLocal = 'http://localhost:8080/carreras';
  private apiUrlLocalRegistrarEstudiante = 'http://localhost:8080/api/auth/estudiante';
  private apiUrl = 'https://pastoralunsabffapiv1.fly.dev/carreras';
  private apiUrlRegistrarEstudiante = 'https://pastoralunsabffapiv1.fly.dev/api/auth/estudiante';

  constructor(private http: HttpClient) { }

  getCarreras(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {});
  }

  registrarEstudianteBff(estudiante: RegistroEstudiante): Observable<any> {
    return this.http.post<any>(this.apiUrlRegistrarEstudiante,estudiante);
  }
}