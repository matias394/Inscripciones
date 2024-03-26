import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrevisualizandoFormularioComponent } from './previsualizando-formulario.component';

describe('PrevisualizandoFormularioComponent', () => {
  let component: PrevisualizandoFormularioComponent;
  let fixture: ComponentFixture<PrevisualizandoFormularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisualizandoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisualizandoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
