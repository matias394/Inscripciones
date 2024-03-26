import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampoFormularioComponent } from './campo-formulario.component';

describe('CampoFormularioComponent', () => {
  let component: CampoFormularioComponent;
  let fixture: ComponentFixture<CampoFormularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
