import { TestBed } from '@angular/core/testing';

import { ThailandService } from './thailand.service';

describe('ThailandService', () => {
  let service: ThailandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThailandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
