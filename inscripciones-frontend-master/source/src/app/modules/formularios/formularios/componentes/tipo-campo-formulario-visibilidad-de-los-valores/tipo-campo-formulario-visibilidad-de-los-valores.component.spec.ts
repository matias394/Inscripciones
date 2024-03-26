import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipoCampoFormularioVisibilidadDeLosValoresComponent } from './tipo-campo-formulario-visibilidad-de-los-valores.component';

describe('TipoCampoFormularioVisibilidadDeLosValoresComponent', () => {
  let component: TipoCampoFormularioVisibilidadDeLosValoresComponent;
  let fixture: ComponentFixture<TipoCampoFormularioVisibilidadDeLosValoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCampoFormularioVisibilidadDeLosValoresComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCampoFormularioVisibilidadDeLosValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
