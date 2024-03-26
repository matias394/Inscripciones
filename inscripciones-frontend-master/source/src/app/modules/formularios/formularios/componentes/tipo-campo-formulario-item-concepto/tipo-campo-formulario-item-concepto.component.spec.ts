import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipoCampoFormularioItemConceptoComponent } from './tipo-campo-formulario-item-concepto.component';

describe('TipoCampoFormularioItemConceptoComponent', () => {
  let component: TipoCampoFormularioItemConceptoComponent;
  let fixture: ComponentFixture<TipoCampoFormularioItemConceptoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCampoFormularioItemConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCampoFormularioItemConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
