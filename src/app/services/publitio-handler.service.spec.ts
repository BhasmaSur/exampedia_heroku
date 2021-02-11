import { TestBed } from '@angular/core/testing';

import { PublitioHandlerService } from './publitio-handler.service';

describe('PublitioHandlerService', () => {
  let service: PublitioHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublitioHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
