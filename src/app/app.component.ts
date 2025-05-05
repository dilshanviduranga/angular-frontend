import { Component } from '@angular/core';
import { StudentListComponent } from './components/student-list/student-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SubjectListComponent],
  template: '<app-subject-list></app-subject-list>',
})
export class AppComponent {}
