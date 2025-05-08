import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Student, StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule], 
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  newStudent: Student = { name: '', age: 0, dob: new Date(), address: '' };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
        next: (data) => {
            this.students = Array.isArray(data) ? data : [];
        },
        error: (err) => console.error('Error loading students', err),
    });
  }

    
  
  addStudent(): void {
    if (!this.newStudent.name.trim() || this.newStudent.age <= 0 || !this.newStudent.dob || !this.newStudent.address.trim()) {
      alert("All fields are required and must be valid!");
      return;
    }
    this.studentService.addStudent(this.newStudent).subscribe({
      next: (response) => {
        alert("Student successfully added!");
        this.newStudent = { name: '', age: 0, dob: new Date(), address: '' };
        this.loadStudents();
      },
      error: (err) => {
        alert("Failed to add student: " + err.message);
      }
    });
  }

  deleteStudent(studentId: number){
    console.log("Delete button pressed................"+studentId);
    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    this.studentService.deleteStudent(studentId).subscribe({
      next: () => {
        alert('Student deleted successfully.');
        this.loadStudents(); 
        
      },
      error: (err) => {
        console.error('Failed to delete student:', err);
        alert('Failed to delete student.');
      }
    });
  }
}
