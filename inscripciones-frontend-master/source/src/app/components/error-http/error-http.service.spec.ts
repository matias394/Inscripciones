import { TestBed } from '@angular/core/testing';

import { ErrorHTTPService } from './error-http.service';

describe('ErrorHTTPService', () => {
  let service: ErrorHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
