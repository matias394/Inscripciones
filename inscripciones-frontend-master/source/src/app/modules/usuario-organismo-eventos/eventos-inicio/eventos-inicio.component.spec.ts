import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosInicioComponent } from './eventos-inicio.component';

describe('EventosInicioComponent', () => {
  let component: EventosInicioComponent;
  let fixture: ComponentFixture<EventosInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
