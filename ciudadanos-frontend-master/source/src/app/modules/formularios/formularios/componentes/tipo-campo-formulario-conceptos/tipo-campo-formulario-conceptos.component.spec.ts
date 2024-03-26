import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipoCampoFormularioConceptosComponent } from './tipo-campo-formulario-conceptos.component';

describe('TipoCampoFormularioConceptosComponent', () => {
  let component: TipoCampoFormularioConceptosComponent;
  let fixture: ComponentFixture<TipoCampoFormularioConceptosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCampoFormularioConceptosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCampoFormularioConceptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
