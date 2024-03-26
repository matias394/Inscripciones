import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampoGrupoIterativoComponent } from './campo-grupo-iterativo.component';

describe('CampoGrupoIterativoComponent', () => {
  let component: CampoGrupoIterativoComponent;
  let fixture: ComponentFixture<CampoGrupoIterativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoGrupoIterativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoGrupoIterativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
