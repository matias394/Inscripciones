import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresAsignadosComponent } from './profesores-asignados.component';

describe('ProfesoresAsignadosComponent', () => {
  let component: ProfesoresAsignadosComponent;
  let fixture: ComponentFixture<ProfesoresAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesoresAsignadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesoresAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
