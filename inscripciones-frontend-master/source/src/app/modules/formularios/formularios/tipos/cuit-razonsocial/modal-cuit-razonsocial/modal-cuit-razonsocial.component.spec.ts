import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCuitRazonsocialComponent } from './modal-cuit-razonsocial.component';

describe('ModalCuitRazonsocialComponent', () => {
  let component: ModalCuitRazonsocialComponent;
  let fixture: ComponentFixture<ModalCuitRazonsocialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCuitRazonsocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCuitRazonsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
