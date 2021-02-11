import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketFooterComponent } from './market-footer.component';

describe('MarketFooterComponent', () => {
  let component: MarketFooterComponent;
  let fixture: ComponentFixture<MarketFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
