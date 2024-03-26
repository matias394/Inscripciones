import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputTituloComponent } from './input-titulo.component';

describe('InputTituloComponent', () => {
  let component: InputTituloComponent;
  let fixture: ComponentFixture<InputTituloComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTituloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
