import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Patient } from '../types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  baseUrl: string = 'http://localhost:8080/patient';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/all`)
  }

  getPatientById(id:string): Observable<Patient>{
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  deletePatientById(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

  addPatient(patient: Patient): Observable<Patient>{
    return this.http.post<Patient>(this.baseUrl, patient, httpOptions)
  }

  updatePatient(id:string, patient:Patient): Observable<Patient> {    
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, patient, httpOptions);
  }
}
