import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ControlesCampoFormularioComponent } from './controles-campo-formulario.component';

describe('ControlesCampoFormularioComponent', () => {
  let component: ControlesCampoFormularioComponent;
  let fixture: ComponentFixture<ControlesCampoFormularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlesCampoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesCampoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
