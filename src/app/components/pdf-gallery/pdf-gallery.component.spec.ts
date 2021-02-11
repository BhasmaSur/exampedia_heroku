import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGalleryComponent } from './pdf-gallery.component';

describe('PdfGalleryComponent', () => {
  let component: PdfGalleryComponent;
  let fixture: ComponentFixture<PdfGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
