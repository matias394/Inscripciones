import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismosComponent } from './organismos.component';

describe('OrganismosComponent', () => {
  let component: OrganismosComponent;
  // Ayuda a detectar cambios en el ciclo de vida del component
  let fixture: ComponentFixture<OrganismosComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganismosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  // Verifica si el component existe
  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Verificar si el snapshot cambio', () => {
    expect(compiled).toMatchSnapshot();
  });
});
