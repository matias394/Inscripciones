import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColonyComponent } from './modal-colony.component';

describe('ModalColonyComponent', () => {
  let component: ModalColonyComponent;
  let fixture: ComponentFixture<ModalColonyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalColonyComponent]
    });
    fixture = TestBed.createComponent(ModalColonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
