import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampoFechaComponent } from './campo-fecha.component';

describe('CampoFechaComponent', () => {
  let component: CampoFechaComponent;
  let fixture: ComponentFixture<CampoFechaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
