import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ITUploadDocComponent } from './it-upload-doc.component';

describe('ITUploadDocComponent', () => {
  let component: ITUploadDocComponent;
  let fixture: ComponentFixture<ITUploadDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ITUploadDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ITUploadDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
