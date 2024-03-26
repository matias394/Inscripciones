import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalFechaComponent } from './modal-fecha.component';

describe('ModalFechaComponent', () => {
  let component: ModalFechaComponent;
  let fixture: ComponentFixture<ModalFechaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
