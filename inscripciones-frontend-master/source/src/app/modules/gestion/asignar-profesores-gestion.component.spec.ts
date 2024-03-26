import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProfesoresGestionComponent } from './asignar-profesores-gestion.component';

describe('AsignarProfesoresGestionComponent', () => {
  let component: AsignarProfesoresGestionComponent;
  let fixture: ComponentFixture<AsignarProfesoresGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarProfesoresGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarProfesoresGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
