import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingFooterComponent } from './coaching-footer.component';

describe('CoachingFooterComponent', () => {
  let component: CoachingFooterComponent;
  let fixture: ComponentFixture<CoachingFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
