import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampoTextoInformativoComponent } from './campo-texto-informativo.component';

describe('CampoTextoInformativoComponent', () => {
  let component: CampoTextoInformativoComponent;
  let fixture: ComponentFixture<CampoTextoInformativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoTextoInformativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoTextoInformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
