import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanciasMobileComponent } from './instancias-mobile.component';

describe('InstanciasMobileComponent', () => {
  let component: InstanciasMobileComponent;
  let fixture: ComponentFixture<InstanciasMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstanciasMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstanciasMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
