import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampoListaDesplegableComponent } from './campo-lista-desplegable.component';

describe('CampoListaDesplegableComponent', () => {
  let component: CampoListaDesplegableComponent;
  let fixture: ComponentFixture<CampoListaDesplegableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoListaDesplegableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoListaDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
