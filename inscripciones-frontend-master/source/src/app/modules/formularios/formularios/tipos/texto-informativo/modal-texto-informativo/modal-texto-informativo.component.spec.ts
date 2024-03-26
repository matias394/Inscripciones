import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalTextoInformativoComponent } from './modal-texto-informativo.component';

describe('ModalTextoInformativoComponent', () => {
  let component: ModalTextoInformativoComponent;
  let fixture: ComponentFixture<ModalTextoInformativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTextoInformativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTextoInformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
