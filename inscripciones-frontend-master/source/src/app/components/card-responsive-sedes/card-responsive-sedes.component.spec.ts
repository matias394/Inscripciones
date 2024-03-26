import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResponsiveSedesComponent } from './card-responsive-sedes.component';

describe('CardResponsiveSedesComponent', () => {
  let component: CardResponsiveSedesComponent;
  let fixture: ComponentFixture<CardResponsiveSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardResponsiveSedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResponsiveSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
