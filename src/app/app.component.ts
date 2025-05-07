import { Component } from '@angular/core';
import { StudentListComponent } from './components/student-list/student-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentSubjectListComponent } from './components/student-subject-list/student-subject-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,
            StudentListComponent, 
            SubjectListComponent, 
            StudentSubjectListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
