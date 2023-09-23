import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRViewDocComponent } from './hr-view-doc.component';

describe('HRViewDocComponent', () => {
  let component: HRViewDocComponent;
  let fixture: ComponentFixture<HRViewDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRViewDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRViewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
