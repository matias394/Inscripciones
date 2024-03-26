import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanosInscriptosComponent } from './ciudadanos-inscriptos.component';

describe('CiudadanosInscriptosComponent', () => {
  let component: CiudadanosInscriptosComponent;
  let fixture: ComponentFixture<CiudadanosInscriptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiudadanosInscriptosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadanosInscriptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
