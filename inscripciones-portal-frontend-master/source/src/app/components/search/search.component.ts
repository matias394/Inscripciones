import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() placeholder: string = '';
  @Output() searchEnter: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.bannerService
      .getCurrentSearchPlaceholder()
      .subscribe((placeholder) => (this.placeholder = placeholder));
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
  }

  onClearSearch(): void {
    this.searchInput.emit('');
    this.onInputChanged('');
  }

  onInputKeyUp(event: Event) {
    if (event instanceof KeyboardEvent) {
      const searchTerm = (event.target as HTMLInputElement).value;
      if (event.key === 'Enter' || searchTerm === '') {
        event.preventDefault();
        this.bannerService.sendSearchEvent(searchTerm);
      }
    }
  }

  onInputChanged(inputValue: string): void {
    const searchTerm = inputValue || '';
    if (searchTerm === '') {
      this.bannerService.sendSearchEvent(searchTerm);
    }
  }
}
