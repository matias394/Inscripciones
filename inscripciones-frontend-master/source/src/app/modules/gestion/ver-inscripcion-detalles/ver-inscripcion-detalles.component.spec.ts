import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInscripcionDetallesComponent } from './ver-inscripcion-detalles.component';

describe('VerInscripcionDetallesComponent', () => {
  let component: VerInscripcionDetallesComponent;
  let fixture: ComponentFixture<VerInscripcionDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerInscripcionDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInscripcionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
