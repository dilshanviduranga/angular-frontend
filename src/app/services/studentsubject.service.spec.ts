import { TestBed } from '@angular/core/testing';

import { StudentsubjectService } from './studentsubject.service';

describe('StudentsubjectService', () => {
  let service: StudentsubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
