import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ListCategories, Organization } from 'src/app/interfaces/interface';
import { BannerService } from 'src/app/services/banner.service';
import { RegistrationsService } from 'src/app/services/registrations.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @Input() public allCategoriesLoaded: boolean = false;
  private data: any;
  public listCategories: any;
  public listOrganismos: any;
  public organization: Organization;
  public cartActive: string = '';
  public page: number = 0;
  public totalPages: number = 1;
  public allItemsLoaded: boolean = false;
  public searchTerm: string = '';
  public searchPlaceholder: string = '';
  private currentCategory: Organization = { id: 0, nombre: '' };
  private unsubscribe$ = new Subject<void>();
  private loadedMoreItems: boolean = false;
  private parameters: string;

  constructor(
    private router: Router,
    private services: RegistrationsService,
    private bannerService: BannerService,
    private route: ActivatedRoute
  ) {
    this.data = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.bannerService.listCategories$.subscribe((listCategorias) => {
      this.listCategories = listCategorias;
    });

    this.organization = this.data = history.state.organization;
    const parameters = this.route.snapshot.params['idOrganization'];

    if (!this.organization && +parameters > -1) {
      this.getOrganismos(+parameters);
      this.getCategoriesByOrganization(+parameters);
    } else {
      this.listCategories = this.data = history.state.data;
      this.setBanner(this.organization);
    }
  }

  getOrganismos(parameters: number): void {
    if (!this.loadedMoreItems) {
      this.page = 0;
    }

    this.services.getOrganismos(this.page, '').subscribe((response: any) => {
      const newOrganismos = response.content.map((organismo: any) => {
        if (organismo.icon || organismo.icon === '') return organismo;
        else
          return {
            ...organismo,
            icon: 'default-icon-organismo',
          };
      });

      if (!this.loadedMoreItems) {
        this.listOrganismos = newOrganismos;
      } else {
        this.listOrganismos = [...this.listOrganismos, ...newOrganismos];
      }

      this.organization = newOrganismos.find(
        (item: any) => item.id === parameters
      );
      this.setBanner(this.organization);

      this.totalPages = response.totalPages;
      this.allCategoriesLoaded = response.last;
    });
  }

  getCategoriesByOrganization(idOrganization: number): void {
    this.services
      .getCategoriesByOrganismos(0, idOrganization)
      .subscribe((response: any) => {
        this.allCategoriesLoaded = response.last;

        this.listCategories = response.content.map((item: any) => {
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

  setBanner(data: Organization) {
    this.bannerService.updateOrganizationId(data.id);
    this.bannerService.changeData(
      'assets/img/banner-portal.png',
      'Inscripciones / ' + data.nombre
    );

    this.bannerService.changeSearchConfig('Buscar en ' + data.nombre, () => {});
  }

  resetCategoriesList(): void {
    this.page = 0;
    this.listCategories = [];
    this.searchTerm = '';
    this.bannerService.clearSearchInput();
    this.loadedMoreItems = false;
    this.allItemsLoaded = false;
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleFocusActive(id: number, index: number): void {
    this.cartActive = 'cart-' + id;
    this.currentCategory = {
      id,
      nombre: this.listCategories[index].nombre,
      url: this.listCategories[index].nombre.replace(/\s+/g, '-'),
    };
    this.getCursoByCategory();
  }

  changePage(): void {
    this.page += 1;
    this.loadedMoreItems = true;
    this.getCategories();
  }

  getCursoByCategory(): void {
    this.services
      .getCursoByCategory(
        this.currentCategory.id,
        this.organization.id,
        this.page
      )
      .subscribe((response: any) => {
        this.allCategoriesLoaded = response.last;

        this.router.navigate(
          [
            `inicio/${this.organization.id}/categorias/cursos/` +
              this.currentCategory.id +
              '-' +
              this.organization.id,
          ],
          {
            state: {
              data: response.content.map((item: any) => {
                if (item.icon || item.icon === '') return item;
                else
                  return {
                    ...item,
                    icon: 'default-icon-category',
                    search: '',
                  };
              }),
              category: this.currentCategory,
              organization: this.organization.id,
            },
          }
        );
      });
  }

  getCategories(): void {
    this.services
      .getCategoriesByOrganismos(this.page, this.organization.id, '')
      .subscribe((response: any) => {
        this.listCategories = response.content.map((item: any) => {
          if (item.icon || item.icon === '') return item;
          else
            return {
              ...item,
              icon: 'default-icon-category',
            };
        });
        this.totalPages = response.totalPages;
        this.allItemsLoaded = response.last;
      });
  }
}
