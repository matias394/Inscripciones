import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

interface Options {
  id: string;
  nombre: string;
}

@Component({
  selector: 'select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit {
  public listActive: boolean = false;
  public filterOptions: Array<any> = [];
  searchList$ = new Subject<string>();

  @Input() typeSearch: string = 'inputForm'; // Tipo InputForm actua dentro de un formulario. Tipo SearchFilter actua como un buscador general
  @Input() listOptions: any[] = [];
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() name: string = 'search';
  @Input() placeholder: string = 'Seleccione un elemento';
  @Input() optionSelected: Options = { id: '', nombre: '' };
  @Input() inputControl: any = new FormControl();
  @Output() changeValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    this.filterOptions = [...this.listOptions];
  }

  ngOnChanges() {
    this.filterList();
    this.filterOptions = [...this.listOptions];
  }

  @HostListener('document:click', ['$event'])
  showListshowList(event: Event): void {
    const target = event?.target as HTMLTextAreaElement;
    if (this.eRef.nativeElement.contains(event.target)) {
      if (target.id != 'input-search' && target.id != 'input-filter-list') {
        this.listActive = false;
      } else {
        this.listActive = true;
      }
    } else {
      this.listActive = false;
    }
  }

  filterList(): void {
    this.searchList$.subscribe((text) => {
      this.filterOptions = this.listOptions.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase())
      );
    });
  }

  slcOrganismo(optionSelected: any) {
    this.listActive = !this.listActive;
    this.inputControl.setValue(optionSelected.nombre);
    this.inputControl.updateValueAndValidity();
    this.optionSelected = optionSelected;
    return this.changeValue.emit(optionSelected.id);
  }
}
