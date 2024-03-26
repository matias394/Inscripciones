import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOrganismosComponent } from './crear-organismos.component';

describe('CrearOrganismosComponent', () => {
  let component: CrearOrganismosComponent;
  let fixture: ComponentFixture<CrearOrganismosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOrganismosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOrganismosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
