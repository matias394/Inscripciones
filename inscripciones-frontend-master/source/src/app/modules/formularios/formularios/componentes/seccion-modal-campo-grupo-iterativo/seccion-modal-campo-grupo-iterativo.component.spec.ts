import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeccionModalCampoGrupoIterativoComponent } from './seccion-modal-campo-grupo-iterativo.component';

describe('SeccionModalCampoGrupoIterativoComponent', () => {
  let component: SeccionModalCampoGrupoIterativoComponent;
  let fixture: ComponentFixture<SeccionModalCampoGrupoIterativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionModalCampoGrupoIterativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionModalCampoGrupoIterativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
