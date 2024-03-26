import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFileUploaderComponent } from './button-file-uploader.component';

describe('ButtonFileUploaderComponent', () => {
  let component: ButtonFileUploaderComponent;
  let fixture: ComponentFixture<ButtonFileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFileUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
