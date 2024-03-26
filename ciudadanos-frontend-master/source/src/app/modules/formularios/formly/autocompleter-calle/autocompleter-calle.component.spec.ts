import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AutocompleterCalleComponent} from './autocompleter-calle.component';

describe('AutocompleterCalleComponent', () => {
  let component: AutocompleterCalleComponent;
  let fixture: ComponentFixture<AutocompleterCalleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleterCalleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleterCalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
