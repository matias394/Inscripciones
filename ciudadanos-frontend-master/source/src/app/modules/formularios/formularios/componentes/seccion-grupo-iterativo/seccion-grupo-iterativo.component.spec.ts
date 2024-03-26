import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeccionGrupoIterativoComponent } from './seccion-grupo-iterativo.component';

describe('SeccionGrupoIterativoComponent', () => {
  let component: SeccionGrupoIterativoComponent;
  let fixture: ComponentFixture<SeccionGrupoIterativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionGrupoIterativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionGrupoIterativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
