import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalArchivoComponent } from './modal-archivo.component';

describe('ModalArchivoComponent', () => {
  let component: ModalArchivoComponent;
  let fixture: ComponentFixture<ModalArchivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
