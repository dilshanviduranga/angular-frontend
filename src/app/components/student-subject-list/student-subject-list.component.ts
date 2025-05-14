import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { StudentSubject, StudentsubjectService } from '../../services/studentsubject.service';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, of, Subscription } from 'rxjs';
import { StudentEventService } from '../../services/student-subject-event.service';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-student-subject-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule], 
  templateUrl: './student-subject-list.component.html',
  styleUrl: './student-subject-list.component.css'
})
export class StudentSubjectListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  studentSubjects: any[] = [];
  newStudentSubject: StudentSubject = { studentId: 0, subjectId: 0}
  studentName : string = "";
  subjectName : string = "";
  editingStudentSubjectId: number | null = null;
  
    constructor(private studentSubjectService: StudentsubjectService,
                private studentEventService: StudentEventService
    ) {}
  
    ngOnInit(): void {
      this.subscription = this.studentEventService.studentListChanged$.subscribe(() => {
        this.loadStudentSubjects();
      })

      this.subscription = this.studentEventService.subjectListChanged$.subscribe(() => {
        this.loadStudentSubjects();
      })
      this.loadStudentSubjects();
    }

    ngOnDestroy() {
    this.subscription.unsubscribe();
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
    
      const studentId$ = this.studentSubjectService.getStudentId(this.studentName).pipe(
        catchError(err => {
          console.error('Failed to get student ID:', err);
          alert('Error fetching student ID.');
          return of(-1);  // Return a fallback value so forkJoin can continue
        })
      );
    
      const subjectId$ = this.studentSubjectService.getSubjectId(this.subjectName).pipe(
        catchError(err => {
          console.error('Failed to get subject ID:', err);
          alert('Error fetching subject ID.');
          return of(-1);  // Return a fallback value so forkJoin can continue
        })
      );

      forkJoin([studentId$, subjectId$]).subscribe({
        next: ([studentId, subjectId]) => {
          if (studentId === -1 || subjectId === -1) {
            alert('Could not add: missing student or subject.');
            return;
          }
          console.log('Student ID is:', studentId);
          console.log('Subject ID is:', subjectId);
    
          this.newStudentSubject = { studentId: studentId, subjectId: subjectId };
          console.log('New StudentSubject:', this.newStudentSubject);
    
          this.studentSubjectService.addStudentSubject(this.newStudentSubject).subscribe({
            next: (response) => {
              alert("Subject successfully added!");
              this.newStudentSubject = { studentId: 0, subjectId: 0 };
              this.studentName = "";
              this.subjectName = "";
              this.loadStudentSubjects();
            },
            error: (err) => {
              alert("Failed to add subject: " + err.message);
            }
          });
        },
        error: (err) => {
          console.error('Failed to get student or subject ID:', err);
        }
      });
    }

    deleteStudentSubject(studentSubjectId: number){
      if (!confirm('Are you sure you want to delete this student?')) {
        return;
      }
  
      this.studentSubjectService.deleteStudentSubject(studentSubjectId).subscribe({
        next: () => {
          alert('Assignation deleted successfully.');
          this.loadStudentSubjects(); 
          
        },
        error: (err: any) => {
          console.error('Failed to delete student subject:', err);
          alert('Failed to delete student subject.');
        }
      });
    }

    startEdit(studentSubject: any): void {
      this.editingStudentSubjectId = studentSubject.id;
    }
    
    cancelEdit(): void {
      this.editingStudentSubjectId = null;
    }
    
    saveEdit(studentSubject: any): void {
      const updatedStudentSubject = {
        id: studentSubject.id,
        studentName: studentSubject.studentName,
        subjectName: studentSubject.subjectName
      };
    
      this.studentSubjectService.updateStudentSubject(studentSubject.id, updatedStudentSubject).subscribe({
        next: () => {
          alert('Student-Subject updated successfully.');
          this.editingStudentSubjectId = null;
        },
        error: (err: any) => {
          console.error('Failed to update student-subject:', err);
          alert('Failed to update student-subject.');
        }
      });
    }
    
}
