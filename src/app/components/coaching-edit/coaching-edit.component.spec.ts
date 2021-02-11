import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingEditComponent } from './coaching-edit.component';

describe('CoachingEditComponent', () => {
  let component: CoachingEditComponent;
  let fixture: ComponentFixture<CoachingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
