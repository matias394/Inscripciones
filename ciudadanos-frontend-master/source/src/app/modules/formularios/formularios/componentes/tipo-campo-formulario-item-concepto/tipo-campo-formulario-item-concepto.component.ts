import { FormBuilder, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ItemConceptoPago } from '../../modelos/item-concepto-pago';

@Component({
  selector: 'app-tipo-campo-formulario-item-concepto',
  templateUrl: './tipo-campo-formulario-item-concepto.component.html',
  styleUrls: ['./tipo-campo-formulario-item-concepto.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TipoCampoFormularioItemConceptoComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: TipoCampoFormularioItemConceptoComponent,
      multi: true
    }
  ]
})
export class TipoCampoFormularioItemConceptoComponent implements OnInit, ControlValueAccessor, Validator {


  //@Input() conceptosPago: ConceptoDePago[] = [];
  @Input() conceptosPago: [] = [];

  item: ItemConceptoPago;

  form = this.fb.group({
    conceptoPago: [],
    cantidad: [null, [Validators.min(1), Validators.maxLength(15)]]
  });

  onChange: (val: ItemConceptoPago) => {};
  onTouched: () => {};
  isDisabled: boolean;

  onValidatorChange: () => void;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.conceptosPago = this.conceptosPago || [];
    this.form.valueChanges.subscribe(
      val => {
        if (this.onChange) {
          this.onChange({
            valorDelComponente: this.item.valorDelComponente,
            conceptoPago: val.conceptoPago,
            cantidad: val.cantidad,
          });
        }
      }
    );
  }

  writeValue(obj: ItemConceptoPago): void {
    this.item = obj;
    if (this.form && obj) {
      // @ts-ignore
      this.form.patchValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.form.valid ? null : {
      itemConceptoInvalido: true
    };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
