import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesComponent } from './categoria.component';

describe('SedesComponent', () => {
  let component: SedesComponent;
  let fixture: ComponentFixture<SedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
