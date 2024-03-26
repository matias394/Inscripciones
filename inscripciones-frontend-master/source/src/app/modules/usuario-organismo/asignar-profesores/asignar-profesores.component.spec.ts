import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProfesoresComponent } from './asignar-profesores.component';

describe('AsignarProfesoresComponent', () => {
  let component: AsignarProfesoresComponent;
  let fixture: ComponentFixture<AsignarProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarProfesoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
