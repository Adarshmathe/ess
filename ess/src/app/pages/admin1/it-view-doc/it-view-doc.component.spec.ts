import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ITViewDocComponent } from './it-view-doc.component';

describe('ITViewDocComponent', () => {
  let component: ITViewDocComponent;
  let fixture: ComponentFixture<ITViewDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ITViewDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ITViewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
