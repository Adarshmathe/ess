import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCircularComponent } from './hr-circular.component';

describe('HrCircularComponent', () => {
  let component: HrCircularComponent;
  let fixture: ComponentFixture<HrCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrCircularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
