import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DireccionCabaComponent } from './direccion-caba.component';

describe('DireccionCabaComponent', () => {
  let component: DireccionCabaComponent;
  let fixture: ComponentFixture<DireccionCabaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionCabaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionCabaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
