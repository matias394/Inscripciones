import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaInscripcionComponent } from './nueva-inscripcion.component';

describe('NuevaInscripcionComponent', () => {
  let component: NuevaInscripcionComponent;
  let fixture: ComponentFixture<NuevaInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
