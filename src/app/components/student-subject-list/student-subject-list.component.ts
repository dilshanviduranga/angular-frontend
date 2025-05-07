import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsubjectService } from '../../services/studentsubject.service';

@Component({
  selector: 'app-student-subject-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-subject-list.component.html',
  styleUrl: './student-subject-list.component.css'
})
export class StudentSubjectListComponent {
  studentSubjects: any[] = [];
  
    constructor(private studentService: StudentsubjectService) {}
  
    ngOnInit(): void {
      this.loadStudentSubjects();
    }
  
    loadStudentSubjects(): void {
      this.studentService.getStudentSubjects().subscribe({
          next: (data) => {
              this.studentSubjects = Array.isArray(data) ? data : [];
          },
          error: (err) => console.error('Error loading students', err),
      });
    }
}
