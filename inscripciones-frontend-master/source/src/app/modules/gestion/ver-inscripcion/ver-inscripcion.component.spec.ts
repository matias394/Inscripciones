import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInscripcionComponent } from './ver-inscripcion.component';

describe('VerInscripcionComponent', () => {
  let component: VerInscripcionComponent;
  let fixture: ComponentFixture<VerInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
