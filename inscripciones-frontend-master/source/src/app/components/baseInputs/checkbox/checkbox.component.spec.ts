import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;

    component.control.setValue({ value: false });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.id).toBeUndefined();
    expect(component.name).toBeUndefined();
    expect(component.label).toBeUndefined();
    expect(component.disabled).toBe(false);
    expect(component.messageError).toBe('Debe seleccionar un elemento');
  });

  it('should set input properties', () => {
    component.id = 'myCheckbox';
    component.name = 'myCheckboxName';
    component.label = 'My Checkbox';
    component.disabled = true;

    fixture.detectChanges(); // Actualiza la vista después de cambiar las propiedades

    expect(component.id).toBe('myCheckbox');
    expect(component.name).toBe('myCheckboxName');
    expect(component.label).toBe('My Checkbox');
    expect(component.disabled).toBe(true);
  });

  it('should bind formControl', () => {
    component.control.setValue({ value: true });

    fixture.detectChanges(); // Actualiza la vista después de cambiar el formControl

    expect(component.control.value.value).toBe(true);
  });
});
