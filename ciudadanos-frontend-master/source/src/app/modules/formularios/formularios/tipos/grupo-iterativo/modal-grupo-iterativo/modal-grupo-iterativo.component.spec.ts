import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalGrupoIterativoComponent } from './modal-grupo-iterativo.component';

describe('ModalGrupoIterativoComponent', () => {
  let component: ModalGrupoIterativoComponent;
  let fixture: ComponentFixture<ModalGrupoIterativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGrupoIterativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGrupoIterativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
