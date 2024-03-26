import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValoresDependenciaCampoFormularioComponent } from './valores-dependencia-campo-formulario.component';

describe('ValoresDependenciaCampoFormularioComponent', () => {
  let component: ValoresDependenciaCampoFormularioComponent;
  let fixture: ComponentFixture<ValoresDependenciaCampoFormularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresDependenciaCampoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresDependenciaCampoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
