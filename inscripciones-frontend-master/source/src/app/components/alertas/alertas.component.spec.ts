import { ComponentFixture, TestBed } from '@angular/core/testing';
import { before } from 'underscore';

import { AlertasComponent } from './alertas.component';

const messageAlert = 'Hola! Esto es un mensaje';

describe('AlertasComponent', () => {
  let component: AlertasComponent;
  let fixture: ComponentFixture<AlertasComponent>;
  let compile: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compile = fixture.nativeElement;
  });

  it('Componente creado', () => {
    expect(component).toBeTruthy();
  });

  test('AlertasComponent snapshot', () => {
    expect(compile).toMatchSnapshot();
  });

  test('Contenedor', () => {
    fixture.detectChanges();
    const alertContainer = compile.querySelector('.alert-div');
    expect(alertContainer.ELEMENT_NODE > 0).toBeTruthy();
  });

  test('Crear alerta por tipo success', () => {
    component.type = 'alert alert-success';
    fixture.detectChanges();
    const alertType = compile.querySelectorAll('.alert-success');
    expect(alertType.length).toBe(1);
  });

  test('Mostrar el mensaje', () => {
    component.message = messageAlert;
    fixture.detectChanges();
    const message = compile.querySelector('.alert-text');
    expect(message?.textContent).toContain(messageAlert);
  });

  test('Comprobar si el boton de cerrar se muestra', () => {
    component.showCloseButton = true;
    fixture.detectChanges();
    const boton = compile.querySelectorAll('button');
    expect(boton.length).toBe(1);
  });

  test('Comprobar si el boton de cerrar No se muestra', () => {
    component.showCloseButton = false;
    fixture.detectChanges();
    const boton = compile.querySelectorAll('button');
    expect(boton.length).toBe(0);
  });

  test('Emitir eventor close', () => {
    component.showCloseButton = true;
    fixture.detectChanges();
    jest.spyOn(component.onClose, 'emit');
    const botonClose = compile.querySelector('[data-dismiss=alert]');
    botonClose.dispatchEvent(new Event('click'));
    expect(component.onClose.emit).toHaveBeenCalled();
  });
});
