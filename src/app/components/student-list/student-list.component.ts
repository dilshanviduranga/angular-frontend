import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Student, StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms';
import { StudentsubjectService } from '../../services/studentsubject.service';
import { StudentEventService } from '../../services/student-subject-event.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule], 
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  newStudent: Student = { name: '', age: 0, dob: new Date(), address: '' };
  editingStudentId: number | null = null;  

  constructor(private studentService: StudentService , 
  private studentEventService: StudentEventService) {}

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


    if (!this.newStudent.name.trim() || !this.newStudent.dob || !this.newStudent.address.trim()) {
      alert("All fields are required and must be valid!");
      return;
    }
    let dobb = new Date(this.newStudent.dob);
    const today = new Date();
    this.newStudent.age = today.getFullYear() - dobb.getFullYear();
    const monthDiff = today.getMonth() - dobb.getMonth();
    const dayDiff = today.getDate() - dobb.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    this.newStudent.age--;
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
        this.studentEventService.notifyStudentListChanged(); 
        
      },
      error: (err) => {
        console.error('Failed to delete student:', err);
        alert('Failed to delete student.');
      }
    });
  }

  startEdit(student: any): void {
    this.editingStudentId = student.id;
  }
  
  cancelEdit(): void {
    this.editingStudentId = null;
  }
  
  saveEdit(student: any): void {
    this.studentService.updateStudent(student.id, student).subscribe({
      next: () => {
        alert('Student updated successfully.');
        this.editingStudentId = null;
        this.studentEventService.notifyStudentListChanged();
      },
      error: (err: any) => {
        console.error('Failed to update student:', err);
        alert('Failed to update student.');
      }
    });
  }
  
}
