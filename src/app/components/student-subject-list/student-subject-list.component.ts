import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { StudentSubject, StudentsubjectService } from '../../services/studentsubject.service';
import { FormsModule } from '@angular/forms';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-student-subject-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule], 
  templateUrl: './student-subject-list.component.html',
  styleUrl: './student-subject-list.component.css'
})
export class StudentSubjectListComponent {
  studentSubjects: any[] = [];
  newStudentSubject: StudentSubject = { studentId: 0, subjectId: 0}
  studentName : string = "";
  subjectName : string = "";
  
    constructor(private studentSubjectService: StudentsubjectService) {}
  
    ngOnInit(): void {
      this.loadStudentSubjects();
    }
  
    loadStudentSubjects(): void {
      this.studentSubjectService.getStudentSubjects().subscribe({
          next: (data) => {
              this.studentSubjects = Array.isArray(data) ? data : [];
          },
          error: (err) => console.error('Error loading students', err),
      });
    }

    addStudentSubject(): void {
      if (!this.subjectName.trim() || !this.studentName.trim()) {
        alert("All fields are required...");
        return;
      }

      let studentIdd: number =0;

      this.studentSubjectService.getStudentId(this.studentName).subscribe({
        next: (response) => {
          studentIdd = response;
          console.log('Student ID is:', studentIdd);
        },
        error: (err) => {
          console.error('Failed to get student ID:', err);
        }
      });

      let subjectIdd: number =0;


      this.studentSubjectService.getSubjectId(this.subjectName).subscribe({
        next: (response) => {
          subjectIdd = response;
          console.log('Subject ID is:', subjectIdd);
        },
        error: (err) => {
          console.error('Failed to get subject ID:', err);
          return;
        }
      });

      console.log(studentIdd+"hehehehehehehehehe"+subjectIdd)
      this.newStudentSubject = { studentId: studentIdd, subjectId: subjectIdd };
      console.log(this.newStudentSubject+"jjjjjjjjjjjjjjjjjjjjjjjj")
      
      this.studentSubjectService.addStudentSubject(this.newStudentSubject).subscribe({
        next: (response) => {
          alert("Subject successfully added!");
          this.newStudentSubject = {studentId: 0, subjectId: 0};
          this.loadStudentSubjects();
        },
        error: (err) => {
          alert("Failed to add subject: " + err.message);
        }
      });
    }
}
