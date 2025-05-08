import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Subject, SubjectService } from '../../services/subject.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule], 
  templateUrl: './subject-list.component.html',
})
export class SubjectListComponent implements OnInit {
  subjects: any[] = [];
  newSubject: Subject = { subjectName: '' };
  editingSubjectId: number | null = null;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
        next: (data) => {
            this.subjects = Array.isArray(data) ? data : [];
        },
        error: (err) => console.error('Error loading students', err),
    });
  }

    
  
    addSubject(): void {
      if (!this.newSubject.subjectName.trim()) {
        alert("All fields are required...");
        return;
      }
      this.subjectService.addSubject(this.newSubject).subscribe({
        next: (response) => {
          alert("Subject successfully added!");
          this.newSubject = { subjectName: ''};
          this.loadSubjects();
        },
        error: (err) => {
          alert("Failed to add subject: " + err.message);
        }
      });
    }

    deleteSubject(subjectId: number){
      if (!confirm('Are you sure you want to delete this student?')) {
        return;
      }
  
      this.subjectService.deleteSubject(subjectId).subscribe({
        next: () => {
          alert('Student deleted successfully.');
          this.loadSubjects(); 
          
        },
        error: (err: any) => {
          console.error('Failed to delete student:', err);
          alert('Failed to delete student.');
        }
      });
    }












    startEdit(subject: any): void {
      this.editingSubjectId = subject.id;
    }
    
    cancelEdit(): void {
      this.editingSubjectId = null;
    }
    
    saveEdit(subject: any): void {
      this.subjectService.updateSubject(subject.id, subject).subscribe({
        next: () => {
          alert('Subject updated successfully.');
          this.editingSubjectId = null;  // Exit edit mode
        },
        error: (err: any) => {
          console.log(subject.id +"ffffffff"+subject.subjectName);
          console.error('Failed to update subject:', err);
          alert('Failed to update subject.');
        }
      });
    }
    

}
