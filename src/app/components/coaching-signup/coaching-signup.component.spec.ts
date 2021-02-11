import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingSignupComponent } from './coaching-signup.component';

describe('CoachingSignupComponent', () => {
  let component: CoachingSignupComponent;
  let fixture: ComponentFixture<CoachingSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
