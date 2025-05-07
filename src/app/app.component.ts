import { Component } from '@angular/core';
import { StudentListComponent } from './components/student-list/student-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentSubjectListComponent } from './components/student-subject-list/student-subject-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { SubjectAddComponent } from './components/subject-add/subject-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,
            StudentListComponent, 
            SubjectListComponent, 
            StudentSubjectListComponent,
            StudentAddComponent,
            SubjectAddComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
