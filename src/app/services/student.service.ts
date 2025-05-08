import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  name: string;
  age: number;
  dob: Date;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://localhost:7067/api/student';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/add`, student);
  }

  deleteStudent(studentId: number){
    return this.http.delete(`${this.apiUrl}/delete/${studentId}`)
  }
}
