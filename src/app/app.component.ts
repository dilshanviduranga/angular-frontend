import { Component } from '@angular/core';
import { StudentListComponent } from './components/student-list/student-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule ,StudentListComponent, SubjectListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
