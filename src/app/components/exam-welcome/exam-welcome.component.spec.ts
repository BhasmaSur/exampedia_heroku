import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamWelcomeComponent } from './exam-welcome.component';

describe('ExamWelcomeComponent', () => {
  let component: ExamWelcomeComponent;
  let fixture: ComponentFixture<ExamWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
