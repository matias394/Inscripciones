import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConfirmarComponent } from './formulario-confirmar.component';

describe('FormularioConfirmarComponent', () => {
  let component: FormularioConfirmarComponent;
  let fixture: ComponentFixture<FormularioConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioConfirmarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
