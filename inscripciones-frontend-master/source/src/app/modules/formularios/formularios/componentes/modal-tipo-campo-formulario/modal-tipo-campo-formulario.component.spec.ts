import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalTipoCampoFormularioComponent } from './modal-tipo-campo-formulario.component';

describe('ModalTipoCampoFormularioComponent', () => {
  let component: ModalTipoCampoFormularioComponent;
  let fixture: ComponentFixture<ModalTipoCampoFormularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTipoCampoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoCampoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
