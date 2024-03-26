import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContenedorSeccionesFormularioComponent } from './contenedor-secciones-formulario.component';

describe('ContenedorSeccionesFormularioComponent', () => {
  let component: ContenedorSeccionesFormularioComponent;
  let fixture: ComponentFixture<ContenedorSeccionesFormularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorSeccionesFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorSeccionesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
