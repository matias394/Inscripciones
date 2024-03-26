import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ListCategories, ListOrganismos } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private image = new BehaviorSubject<string>('');
  private description = new BehaviorSubject<string>('');
  private searchPlaceholder = new BehaviorSubject<string>('');
  private searchFunction = new BehaviorSubject<Function>(() => {});
  private searchInputSubject = new BehaviorSubject<string>('');
  searchInputChange$ = this.searchInputSubject.asObservable();
  private searchEvent = new Subject<string>();
  searchEvent$ = this.searchEvent.asObservable();
  private listOrganismosSource = new BehaviorSubject<ListOrganismos[]>([]);
  private listCategoriesSource = new BehaviorSubject<ListCategories[]>([]);
  private listCursosSource = new BehaviorSubject<any[]>([]);
  private organizationIdSource = new BehaviorSubject<number>(0);
  private categoryIdSource = new BehaviorSubject<any>(0);
  listOrganismos$ = this.listOrganismosSource.asObservable();
  listCategories$ = this.listCategoriesSource.asObservable();
  listCursos$ = this.listCursosSource.asObservable();
  organizationId$ = this.organizationIdSource.asObservable();
  cursoId$ = this.categoryIdSource.asObservable();
  currentImage = this.image.asObservable();
  currentDescription = this.description.asObservable();

  sendSearchEvent(searchTerm: string) {
    this.searchEvent.next(searchTerm);
  }

  updateListOrganismos(newList: ListOrganismos[]) {
    this.listOrganismosSource.next(newList);
  }

  updateListCategories(newList: ListCategories[]) {
    this.listCategoriesSource.next(newList);
  }

  updateListCourses(newList: any[]) {
    this.listCursosSource.next(newList);
  }

  updateOrganizationId(id: number) {
    this.organizationIdSource.next(id);
  }

  updateCategoryId(id: any) {
    this.categoryIdSource.next(id);
  }

  changeData(image: string, description: string) {
    this.image.next(image);
    this.description.next(description);
  }

  changeSearchConfig(placeholder: string, searchFunction: Function) {
    this.searchPlaceholder.next(placeholder);
    this.searchFunction.next(searchFunction);
  }

  getCurrentSearchPlaceholder() {
    return this.searchPlaceholder.asObservable();
  }

  clearSearchInput() {
    this.searchEvent.next('');
    this.searchInputSubject.next('');
  }
}
