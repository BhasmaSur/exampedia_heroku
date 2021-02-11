import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingPreviewComponent } from './coaching-preview.component';

describe('CoachingPreviewComponent', () => {
  let component: CoachingPreviewComponent;
  let fixture: ComponentFixture<CoachingPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
