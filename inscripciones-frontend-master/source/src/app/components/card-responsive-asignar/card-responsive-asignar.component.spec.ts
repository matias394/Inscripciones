import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResponsiveAsignarComponent } from './card-responsive-asignar.component';

describe('CardResponsiveAsignarComponent', () => {
  let component: CardResponsiveAsignarComponent;
  let fixture: ComponentFixture<CardResponsiveAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardResponsiveAsignarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResponsiveAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
