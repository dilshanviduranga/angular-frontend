import { TestBed } from '@angular/core/testing';

import { StudentEventService } from './student-subject-event.service';

describe('StudentEventService', () => {
  let service: StudentEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
