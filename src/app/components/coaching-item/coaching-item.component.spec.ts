import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingItemComponent } from './coaching-item.component';

describe('CoachingItemComponent', () => {
  let component: CoachingItemComponent;
  let fixture: ComponentFixture<CoachingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
