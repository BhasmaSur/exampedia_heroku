import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingNavbarComponent } from './coaching-navbar.component';

describe('CoachingNavbarComponent', () => {
  let component: CoachingNavbarComponent;
  let fixture: ComponentFixture<CoachingNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
