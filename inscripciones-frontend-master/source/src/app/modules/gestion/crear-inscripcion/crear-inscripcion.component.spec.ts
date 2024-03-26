import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInscripcionComponent } from './crear-inscripcion.component';

describe('CrearInscripcionComponent', () => {
  let component: CrearInscripcionComponent;
  let fixture: ComponentFixture<CrearInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
