import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProfesoresAsistenciasComponent } from './asignar-profesores-asistencias.component';

describe('AsignarProfesoresAsistenciasComponent', () => {
  let component: AsignarProfesoresAsistenciasComponent;
  let fixture: ComponentFixture<AsignarProfesoresAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarProfesoresAsistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarProfesoresAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
