import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesMobileComponent } from './sedes-mobile.component';

describe('SedesMobileComponent', () => {
  let component: SedesMobileComponent;
  let fixture: ComponentFixture<SedesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
