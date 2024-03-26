import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProfesoresConsultaComponent } from './asignar-profesores-consulta.component';

describe('AsignarProfesoresConsultaComponent', () => {
  let component: AsignarProfesoresConsultaComponent;
  let fixture: ComponentFixture<AsignarProfesoresConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarProfesoresConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarProfesoresConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
