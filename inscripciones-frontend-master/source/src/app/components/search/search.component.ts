import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() placeholder: string = 'Buscar';
  @Output() searchEnter: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();

  onInputKeyUp(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter' || searchTerm === '') {
      this.searchEnter.emit(searchTerm);
    }
  }

  onInputChanged(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue === '') {
      this.searchInput.emit(inputValue);
    }
  }
}
