import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeccionFormularioComponent } from './seccion-formulario.component';

describe('SeccionFormularioComponent', () => {
  let component: SeccionFormularioComponent;
  let fixture: ComponentFixture<SeccionFormularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
