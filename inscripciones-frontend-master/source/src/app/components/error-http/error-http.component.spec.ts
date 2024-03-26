import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHTTPComponent } from './error-http.component';

describe('ErrorHTTPComponent', () => {
  let component: ErrorHTTPComponent;
  let fixture: ComponentFixture<ErrorHTTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorHTTPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorHTTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
