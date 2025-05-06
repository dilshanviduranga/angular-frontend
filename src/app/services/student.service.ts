import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
