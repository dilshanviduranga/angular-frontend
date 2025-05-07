import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface StudentSubject {
  id?: number;
  studentId: number;
  subjectId: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsubjectService {
  private apiUrl = 'https://localhost:7067/api/studentsubject';
  
    constructor(private http: HttpClient) {}
  
    getStudentSubjects(): Observable<any> {
      return this.http.get(`${this.apiUrl}/get`);
    }
  
    getStudentSubject(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }

    addStudentSubject(studentSubject: StudentSubject): Observable<StudentSubject> {
      console.log('Posting:', studentSubject);
        return this.http.post<StudentSubject>(`${this.apiUrl}/add`, studentSubject);
    }

    getStudentId(studentName: string): Observable<any>{
      return this.http.get(`${this.apiUrl}/findstudent/${studentName}`);
    }

    getSubjectId(subjectName: string): Observable<any>{
      return this.http.get(`${this.apiUrl}/findsubject/${subjectName}`);
    }
}
