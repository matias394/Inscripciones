import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ListCategories, ListOrganismos } from 'src/app/interfaces/interface';
import { BannerService } from 'src/app/services/banner.service';
import { RegistrationsService } from 'src/app/services/registrations.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() image: string = '';
  @Input() description: string = '';
  @Input() searchPlaceholder: string = '';
  public searchTerm: string = '';
  public allItemsLoaded: boolean = false;
  public listOrganismos: ListOrganismos = [];
  public listCategories: ListCategories = [];
  public organization: any;
  public organizationId: number;
  public categoryId: number;
  public totalPages: number = 0;
  public currentPage: number = 1;
  private currentUrl: string = '';
  currentSearchTerm: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private bannerService: BannerService,
    private router: Router,
    private services: RegistrationsService
  ) {}

  ngOnInit(): void {
    this.bannerService
      .getCurrentSearchPlaceholder()
      .subscribe((placeholder) => {
        this.searchPlaceholder = placeholder;
      });

    this.bannerService.organizationId$.subscribe((id) => {
      this.organizationId = id;
    });

    this.bannerService.cursoId$.subscribe((id) => {
      this.categoryId = id;
    });

    this.bannerService.searchEvent$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((searchTerm: string) => {
        const url = this.router.url.split('/');
        if (url.indexOf('cursos') > -1) {
          this.searchCourses(searchTerm);
        } else if (url.indexOf('categorias') > -1) {
          this.searchCategories(searchTerm);
        } else {
          this.searchOrganismo(searchTerm);
        }
      });
  }

  estoyEnHome(url: string): boolean {
    return this.router.url === 'inicio';
  }

  estoyEnCategorias(): boolean {
    return this.router.url === '/inicio/categorias';
  }

  estoyEnCursos(): boolean {
    return this.router.url === '/inicio/categorias/cursos';
  }

  searchOrganismo = (searchTerm: string) => {
    this.services.getOrganismos(0, searchTerm).subscribe((response: any) => {
      const newListData = response.content.map((organismo: any) => {
        if (organismo.icon || organismo.icon === '') return organismo;
        else
          return {
            ...organismo,
            icon: 'default-icon-organismo',
          };
      });
      this.bannerService.updateListOrganismos(newListData);
      this.totalPages = response.totalPages;
      this.allItemsLoaded = response.last;
    });
  };

  searchCategories = (searchTerm: string) => {
    this.services
      .getCategoriesByOrganismos(0, this.organizationId, searchTerm)
      .subscribe((response: any) => {
        const newListData = response.content.map((item: any) => ({
          ...(item.icon || item.icon === ''
            ? item
            : { ...item, icon: 'default-icon-category' }),
        }));
        this.bannerService.updateListCategories(newListData);
        this.totalPages = response.totalPages;
        this.allItemsLoaded = response.last;
      });
  };

  searchCourses(searchTerm: string): void {
    console.log(this.categoryId, this.organizationId, 0, searchTerm);
    this.services
      .getCursoByCategory(this.categoryId, this.organizationId, 0, searchTerm)
      .subscribe((response: any) => {
        const newListData = response.content.map((item: any) => ({
          ...(item.icon || item.icon === ''
            ? item
            : { ...item, icon: 'default-icon-category' }),
        }));
        this.bannerService.updateListCourses(newListData);
        this.totalPages = response.totalPages;
        this.allItemsLoaded = response.last;
      });
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.searchTerm = searchTerm;
    }
  }

  onSearchInput(searchTerm: string) {
    this.searchTerm = searchTerm;
  }
}
