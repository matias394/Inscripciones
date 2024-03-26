import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {ModeloArchivo} from '../modelo-archivo';

@Component({
  selector: 'app-button-file-uploader',
  templateUrl: './button-file-uploader.component.html',
  styleUrls: ['./button-file-uploader.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ButtonFileUploaderComponent,
    multi: true
  }]
})
export class ButtonFileUploaderComponent implements OnInit, ControlValueAccessor {

  @Input() buttonText: string;
  @Input() acceptTypes: string[];
  @Input() inputId: string;
  @Input() maxSizeMB: number;
  @Input() errorMsgs: {
    [key: string]: string;
  };
  @Output() hasError = new EventEmitter<string>();

  onChange: (val: ModeloArchivo) => {};
  onTouched: () => {};
  isDisabled: boolean;

  selectedFile: ModeloArchivo;
  validTypes: string;

  isErrorPresent: boolean;
  errorMsg: string;

  constructor() { }

  ngOnInit() {
    this.buttonText = this.buttonText || '+ Seleccionar archivo...';
    if (this.acceptTypes) {
      this.validTypes = this.acceptTypes.join(',');
    }
  }

  uploadFile(event: any) {
    this.selectedFile = new ModeloArchivo();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectedFile.nombre = file.name;
      if (this.archivoValido(file)) {
        reader.readAsDataURL(file);
        this.isErrorPresent = false;
      } else {
        // Enviamos un error en la carga del achivo
        this.hasError.next('upload');
        this.selectedFile = null;
        this.isErrorPresent = true;
      }
    }
    reader.onloadend = () => {
      this.selectedFile.path = '';
      this.selectedFile.content = <any>reader.result;
      event.target.value = null;
      this.onChange(this.selectedFile);
    };

  }

  private archivoValido(file): boolean {
    if (!this.extensionValida(file.name)) {
      // emitimos un error de tipo invalido
      this.hasError.next('invalidType');
      this.errorMsg = this.errorMsgs['invalidType'];
      return false;
    }
    if (this.maxSizeMB) {
      const bytesTamañoMaximoArchivo = this.maxSizeMB * 1024 * 1024;
      if (file.size > bytesTamañoMaximoArchivo) {
        // emitimos un error de tamaño maximo superado
        this.hasError.next('size');
        this.errorMsg = this.errorMsgs['size'];
        return false;
      }
    }

    return true;
  }

  private extensionValida(nombreArchivo: string): boolean {
    let valido = false;
    if (!this.acceptTypes) { return true; }
    this.acceptTypes.forEach(extension => {
      if (nombreArchivo.toLowerCase().includes(extension.toLowerCase())) {
        valido = true;
      }
    });
    return valido;
  }

  writeValue(obj: ModeloArchivo): void {
    this.selectedFile = obj;
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
}
