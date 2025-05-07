import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectListComponent } from './student-subject-list.component';

describe('StudentSubjectListComponent', () => {
  let component: StudentSubjectListComponent;
  let fixture: ComponentFixture<StudentSubjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSubjectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
