import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItCircularComponent } from './it-circular.component';

describe('ItCircularComponent', () => {
  let component: ItCircularComponent;
  let fixture: ComponentFixture<ItCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItCircularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
