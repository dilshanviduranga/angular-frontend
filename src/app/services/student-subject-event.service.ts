import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentEventService {
  private studentListChangedSource = new Subject<void>();
  studentListChanged$ = this.studentListChangedSource.asObservable();

  private subjectListChangedSource = new Subject<void>();
  subjectListChanged$ = this.subjectListChangedSource.asObservable();

  notifyStudentListChanged() {
    this.studentListChangedSource.next();
  }

  notifySubjectListChanged(){
    this.subjectListChangedSource.next();
  }
}
