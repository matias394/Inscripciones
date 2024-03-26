import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CuitRazonsocialComponent } from './cuit-razonsocial.component';

describe('CuitRazonsocialComponent', () => {
  let component: CuitRazonsocialComponent;
  let fixture: ComponentFixture<CuitRazonsocialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CuitRazonsocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuitRazonsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
