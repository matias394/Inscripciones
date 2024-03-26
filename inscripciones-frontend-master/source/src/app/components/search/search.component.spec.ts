import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchEnter event when Enter key is pressed', () => {
    spyOn(component.searchEnter, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Search Term';
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();
    expect(component.searchEnter.emit).toHaveBeenCalledWith('Search Term');
  });

  it('should not emit searchEnter event when key other than Enter is pressed', () => {
    spyOn(component.searchEnter, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Search Term';
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Space' }));
    fixture.detectChanges();
    expect(component.searchEnter.emit).not.toHaveBeenCalled();
  });

  it('should emit searchEnter event when input is cleared', () => {
    spyOn(component.searchInput, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchInput.emit).toHaveBeenCalledWith('');
  });
});
