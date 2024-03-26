import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampoCuitRazonsocialComponent } from './campo-cuit-razonsocial.component';

describe('CampoCuitRazonsocialComponent', () => {
  let component: CampoCuitRazonsocialComponent;
  let fixture: ComponentFixture<CampoCuitRazonsocialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoCuitRazonsocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoCuitRazonsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
