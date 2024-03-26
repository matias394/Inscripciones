import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResponsiveInstanciasComponent } from './card-responsive-instancias.component';

describe('CardResponsiveInstanciasComponent', () => {
  let component: CardResponsiveInstanciasComponent;
  let fixture: ComponentFixture<CardResponsiveInstanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardResponsiveInstanciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResponsiveInstanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
