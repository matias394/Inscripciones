import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResponsiveReportesComponent } from './card-responsive-reportes.component';

describe('CardResponsiveReportesComponent', () => {
  let component: CardResponsiveReportesComponent;
  let fixture: ComponentFixture<CardResponsiveReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardResponsiveReportesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResponsiveReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
