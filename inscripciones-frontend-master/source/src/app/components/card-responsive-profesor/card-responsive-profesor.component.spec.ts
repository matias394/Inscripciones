import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResponsiveProfesorComponent } from './card-responsive-profesor.component';

describe('CardResponsiveProfesorComponent', () => {
  let component: CardResponsiveProfesorComponent;
  let fixture: ComponentFixture<CardResponsiveProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardResponsiveProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResponsiveProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
