import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SelectorExcluyenteComponent} from './selector-excluyente.component';

describe('SelectorExcluyenteComponent', () => {
  let component: SelectorExcluyenteComponent;
  let fixture: ComponentFixture<SelectorExcluyenteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorExcluyenteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorExcluyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
