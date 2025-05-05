import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-list.component.html',
})
export class SubjectListComponent implements OnInit {
  subjects: any[] = [];

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

}
