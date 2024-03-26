import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputTextoInformativoComponent } from './input-texto-informativo.component';

describe('InputTextoInformativoComponent', () => {
  let component: InputTextoInformativoComponent;
  let fixture: ComponentFixture<InputTextoInformativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextoInformativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextoInformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
