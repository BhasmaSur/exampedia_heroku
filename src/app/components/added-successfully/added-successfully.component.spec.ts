import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedSuccessfullyComponent } from './added-successfully.component';

describe('AddedSuccessfullyComponent', () => {
  let component: AddedSuccessfullyComponent;
  let fixture: ComponentFixture<AddedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedSuccessfullyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
