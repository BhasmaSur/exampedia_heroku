import { TestBed } from '@angular/core/testing';

import { CoachingProfileGuardGuard } from './coaching-profile-guard.guard';

describe('CoachingProfileGuardGuard', () => {
  let guard: CoachingProfileGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoachingProfileGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
