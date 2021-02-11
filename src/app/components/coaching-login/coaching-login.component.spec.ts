import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingLoginComponent } from './coaching-login.component';

describe('CoachingLoginComponent', () => {
  let component: CoachingLoginComponent;
  let fixture: ComponentFixture<CoachingLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
