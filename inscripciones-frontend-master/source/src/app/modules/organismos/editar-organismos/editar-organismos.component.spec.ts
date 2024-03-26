import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOrganismosComponent } from './editar-organismos.component';

describe('EditarOrganismosComponent', () => {
  let component: EditarOrganismosComponent;
  let fixture: ComponentFixture<EditarOrganismosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarOrganismosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOrganismosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
