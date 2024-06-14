import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RegistroEstudiante from '../interfaces/registroEstudiante';
import RegistroCatequista from '../interfaces/registroCatequista';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlRegistrarEstudiante = 'https://unsapastoralbff.fly.dev/api/auth/estudiante';
  private apiUrlRegistrarCatequista = 'https://unsapastoralbff.fly.dev/api/auth/catequista';

  constructor(private http: HttpClient) { }

  registrarEstudianteBff(estudiante: RegistroEstudiante): Observable<any> {
    return this.http.post<any>(this.apiUrlRegistrarEstudiante,estudiante);
  }

  registrarCatequistaBff(catequista: RegistroCatequista): Observable<any> {
    return this.http.post<any>(this.apiUrlRegistrarCatequista,catequista);
  }
}