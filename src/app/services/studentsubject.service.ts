import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsubjectService {
  private apiUrl = 'https://localhost:7067/api/studentsubject/get';
  
    constructor(private http: HttpClient) {}
  
    getStudentSubjects(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  
    getStudentSubject(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }
}
