import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from './text-input.component';
import { ErrorInputComponent } from '@components/error-input/error-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TextInputComponent, ErrorInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    component.label = 'Input Label';
    component.id = 'inputId';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.type).toBe('text');
    expect(component.max).toBe(32);
    expect(component.control instanceof FormControl).toBe(true);
    expect(component.placeholder).toBeUndefined();
    expect(component.disabled).toBe(false);
    expect(component.messageError).toBe('');
  });

  it('should set input properties', () => {
    component.type = 'number';
    component.max = 50;
    component.placeholder = ' Input Placeholder ';
    component.disabled = true;
    component.messageError = ' Custom error message ';

    fixture.detectChanges();

    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    const labelElement: HTMLLabelElement =
      fixture.nativeElement.querySelector('label');

    expect(inputElement.getAttribute('type')).toBe('number');
    expect(inputElement.getAttribute('max')).toBe('50');
    expect(inputElement.id).toBe('inputId');
    expect(inputElement.getAttribute('placeholder')).toBe(
      ' Input Placeholder '
    );
    expect(inputElement.disabled).toBe(false);
    expect(labelElement.textContent).toBe(' Input Label ');
  });
});
