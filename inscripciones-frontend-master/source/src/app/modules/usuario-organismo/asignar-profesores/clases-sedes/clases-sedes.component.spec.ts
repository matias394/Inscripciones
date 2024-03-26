import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesSedesComponent } from './clases-sedes.component';

describe('ClasesSedesComponent', () => {
  let component: ClasesSedesComponent;
  let fixture: ComponentFixture<ClasesSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasesSedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasesSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
