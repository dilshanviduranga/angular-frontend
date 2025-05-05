import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = 'https://localhost:7067/api/subject';

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<any> {
      return this.http.get(this.apiUrl).pipe(
          map((response: any) => response.data)
      );
  }
  
  
    getSubject(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }
}
