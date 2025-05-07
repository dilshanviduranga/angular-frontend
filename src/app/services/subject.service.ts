import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Subject {
  subjectName: string;
}
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = 'https://localhost:7067/api/subject';

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
  
  getSubject(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addSubject(subject: Subject): Observable<Subject> {
      
      return this.http.post<Subject>(`${this.apiUrl}/add`, subject);
    }
}
