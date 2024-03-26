import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProfesoresReportesComponent } from './asignar-profesores-reportes.component';

describe('AsignarProfesoresReportesComponent', () => {
  let component: AsignarProfesoresReportesComponent;
  let fixture: ComponentFixture<AsignarProfesoresReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarProfesoresReportesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarProfesoresReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
