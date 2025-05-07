import { Component } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-add',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule], 
  templateUrl: './subject-add.component.html'
})
export class SubjectAddComponent {
  newSubject: Subject = { subjectName: '' };
  

  constructor(private subjectService: SubjectService) {}

  addSubject(): void {
    if (!this.newSubject.subjectName.trim()) {
      alert("All fields are required...");
      return;
    }
    this.subjectService.addSubject(this.newSubject).subscribe({
      next: (response) => {
        alert("Subject successfully added!");
        this.newSubject = { subjectName: ''};
      },
      error: (err) => {
        alert("Failed to add subject: " + err.message);
      }
    });
  }
}