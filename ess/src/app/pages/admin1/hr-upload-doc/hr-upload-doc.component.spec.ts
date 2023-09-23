import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRUploadDocComponent } from './hr-upload-doc.component';

describe('HRUploadDocComponent', () => {
  let component: HRUploadDocComponent;
  let fixture: ComponentFixture<HRUploadDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRUploadDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRUploadDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
