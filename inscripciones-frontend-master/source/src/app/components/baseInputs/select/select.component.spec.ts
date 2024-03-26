import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { ErrorInputComponent } from '@components/error-input/error-input.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SelectComponent, ErrorInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.control instanceof FormControl).toBe(true);
    expect(component.id).toBeUndefined();
    expect(component.label).toBeUndefined();
    expect(component.placeholder).toBeUndefined();
    expect(component.disabled).toBe(false);
    expect(component.listaOptions).toEqual([]);
  });

  it('should set input properties', () => {
    component.id = 'selectId';
    component.label = 'Select Label';
    component.placeholder = 'Seleccionar';
    component.disabled = true;
    component.listaOptions = [
      { id: 1, nombre: 'Option 1' },
      { id: 2, nombre: 'Option 2' },
    ];

    fixture.detectChanges();

    const selectElement: HTMLSelectElement =
      fixture.nativeElement.querySelector('select');
    const labelElement: HTMLLabelElement =
      fixture.nativeElement.querySelector('label');

    expect(selectElement.id).toBe('selectId');
    expect(labelElement.textContent).toBe('Select Label');
    expect(selectElement.getAttribute('placeholder')).toBe(null);
    expect(selectElement.disabled).toBe(false);

    const optionElements: HTMLOptionElement[] =
      fixture.nativeElement.querySelectorAll('option');
    expect(optionElements.length).toBe(3);
    expect(optionElements[0].textContent).toBe('Seleccionar');
    expect(optionElements[0].value).toBe('');
    expect(optionElements[1].textContent).toBe(' Option 1 ');
    expect(optionElements[1].value).toBe('1');
    expect(optionElements[2].textContent).toBe(' Option 2 ');
    expect(optionElements[2].value).toBe('2');
  });

  it('should display an error message when control is invalid and touched', () => {
    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorInputComponent: HTMLElement =
      fixture.nativeElement.querySelector('error-input');
    expect(errorInputComponent).toBeTruthy();

    // Comprueba si el mensaje de error se muestra
    const errorMessage: string = errorInputComponent.textContent.trim();
    expect(errorMessage).toBe('');
  });
});
