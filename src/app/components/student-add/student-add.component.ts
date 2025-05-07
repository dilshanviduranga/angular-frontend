import { Component } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule], 
  templateUrl: './student-add.component.html'
})
export class StudentAddComponent {
  newStudent: Student = { name: '', age: 0, dob: new Date(), address: '' };
  

  constructor(private studentService: StudentService) {}

  addStudent(): void {
    if (!this.newStudent.name.trim() || this.newStudent.age <= 0 || !this.newStudent.dob || !this.newStudent.address.trim()) {
      alert("All fields are required and must be valid!");
      return;
    }
    this.studentService.addStudent(this.newStudent).subscribe({
      next: (response) => {
        alert("Student successfully added!");
        this.newStudent = { name: '', age: 0, dob: new Date(), address: '' };
      },
      error: (err) => {
        alert("Failed to add student: " + err.message);
      }
    });
  }
}