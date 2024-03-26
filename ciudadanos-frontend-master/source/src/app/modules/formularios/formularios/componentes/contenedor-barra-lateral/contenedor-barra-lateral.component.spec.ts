import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContenedorBarraLateralComponent } from './contenedor-barra-lateral.component';

describe('ContenedorBarraLateralComponent', () => {
  let component: ContenedorBarraLateralComponent;
  let fixture: ComponentFixture<ContenedorBarraLateralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorBarraLateralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorBarraLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
