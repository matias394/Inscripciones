import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ListColony } from 'src/app/interfaces/interface';
import { BannerService } from 'src/app/services/banner.service';
import { RegistrationsService } from 'src/app/services/registrations.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  @Input() public allCategoriesLoaded: boolean = false;
  private data: any;
  public listCourses: any[] = [];
  public category: any;
  public cartActive: string = '';
  public modalSwitch: boolean = false;
  public totalPages: number = 1;
  public allItemsLoaded: boolean = false;
  public searchTerm: string = '';
  public sedesTemplate: boolean;
  public categorySelected: any;
  public searchPlaceholder: string = '';
  public organization: any;
  private loadedMoreItems: boolean = false;
  private unsubscribe$ = new Subject<void>();
  private page: number = 0;
  public listOrganismos: any[] = [];

  constructor(
    private router: Router,
    private bannerService: BannerService,
    private services: RegistrationsService,
    private route: ActivatedRoute
  ) {
    this.data = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    const parameters = this.route.snapshot.params['id'];

    this.bannerService.listCursos$.subscribe((listCourse) => {
      this.listCourses = listCourse;
    });

    this.bannerService.listOrganismos$.subscribe((listOrganismos) => {
      this.listOrganismos = listOrganismos;
    });

    this.organization = +parameters.split('-')[1];

    if (history.state.data && !parameters) {
      this.listCourses = this.data = history.state.data;
      this.category = this.data = history.state.category;
      this.setDataCategory();
    } else {
      let ids: Array<number> = parameters
        .split('-')
        .map((e: string) => parseInt(e));
      this.getDataCategory(ids[0]);
      this.getCursoByCategory(ids[0], ids[1]);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getDataCategory(id: number) {
    this.services.getDataCategory(id).subscribe((data) => {
      this.category = data;
      this.setDataCategory();
    });
  }

  setDataCategory(): void {
    this.bannerService.updateOrganizationId(this.organization);
    this.bannerService.updateCategoryId(this.category.id);

    this.bannerService.changeData(
      'assets/img/banner-portal.png',
      'Inscripciones / ' + this.category.nombre
    );

    this.bannerService.changeSearchConfig(
      'Buscar en ' + this.category.nombre,
      () => {}
    );
  }

  getCursoByCategory(categoryID: number, orgatizationID: number): void {
    this.services
      .getCursoByCategory(categoryID, orgatizationID, this.page)
      .subscribe((response: any) => {
        this.allCategoriesLoaded = response.last;
        this.listCourses = response.content.map((item: any) => {
          if (item.icon || item.icon === '') return item;
          else
            return {
              ...item,
              icon: 'default-icon-category',
              search: '',
            };
        });
      });
  }

  resetCoursesList(): void {
    this.page = 0;
    this.listCourses = [];
    this.searchTerm = '';
    this.bannerService.clearSearchInput();
    this.loadedMoreItems = false;
    this.allItemsLoaded = false;
    this.getCourses();
  }

  changePage(): void {
    this.page += 1;
    this.loadedMoreItems = true;
    this.getCourses();
  }

  getCourses(): void {
    if (!this.loadedMoreItems) {
      this.page = 0;
    }

    this.services
      .getCursoByCategory(this.category.id, this.organization, this.page, '')
      .subscribe((response: any) => {
        const newCourses = response.content.map((item: any) => ({
          ...(item.icon || item.icon === ''
            ? item
            : { ...item, icon: 'default-icon-category' }),
        }));

        if (!this.loadedMoreItems) {
          this.listCourses = newCourses;
        } else {
          this.listCourses = [...this.listCourses, ...newCourses];
        }

        this.totalPages = response.totalPages;
        this.allItemsLoaded = response.last;
      });
  }

  openModalColony(index: number): void {
    this.categorySelected = this.listCourses[index];
    this.modalSwitch = !this.modalSwitch;
  }

  handleClick(id: number, index: number): void {
    this.cartActive = 'cart-' + index;
    const url = this.listCourses[index].url;
    window.open(url, '_blank');
  }

  closeModal(): void {
    this.modalSwitch = false;
  }
}
