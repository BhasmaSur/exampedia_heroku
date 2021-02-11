import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamOverComponent } from './exam-over.component';

describe('ExamOverComponent', () => {
  let component: ExamOverComponent;
  let fixture: ComponentFixture<ExamOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
