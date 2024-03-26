import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Organization } from 'src/app/interfaces/interface';
import { BannerService } from 'src/app/services/banner.service';
import { RegistrationsService } from 'src/app/services/registrations.service';

@Component({
  selector: 'app-layout',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public listOrganismos: any[] = [];
  public cartActive: string = '';
  public page: number = 0;
  public totalPages: number = 0;
  public image: string = 'assets/img/banner-portal.png';
  public description: string = 'Portal de inscripciones';
  public searchPlaceholder: string = 'Buscar organismos';
  public searchTerm: string = '';
  public allItemsLoaded: boolean = false;
  private currentOrganization: Organization = { id: 0, nombre: '' };
  private loadedMoreItems: boolean = false;
  private unsubscribe$ = new Subject<void>();
  @Output() public allCategoriesLoaded: boolean = false;

  constructor(
    private services: RegistrationsService,
    private router: Router,
    private bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this.getOrganismos();

    this.bannerService.changeData(
      'assets/img/banner-portal.png',
      'Portal de inscripciones'
    );

    this.bannerService.changeSearchConfig('Buscar organismos', () => {});

    this.bannerService.listOrganismos$.subscribe((listOrganismos) => {
      this.listOrganismos = listOrganismos;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleFocusActive(id: number, index: number): void {
    this.cartActive = 'cart-' + id;
    this.currentOrganization = {
      id,
      nombre: this.listOrganismos[index].nombre,
      url: this.listOrganismos[index].nombre.replace(/\s+/g, '-'),
    };
    this.getCategoriesByOrganization(id);
  }

  changePage(): void {
    this.page += 1;
    this.loadedMoreItems = true;
    this.getOrganismos();
  }

  resetOrganismList(): void {
    this.page = 0;
    this.listOrganismos = [];
    this.searchTerm = '';
    this.bannerService.clearSearchInput();
    this.loadedMoreItems = false;
    this.allItemsLoaded = false;
    this.getOrganismos();
  }

  getOrganismos(): void {
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

      this.totalPages = response.totalPages;
      this.allItemsLoaded = response.last;
    });
  }

  getCategoriesByOrganization(idOrganization: number): void {
    this.services
      .getCategoriesByOrganismos(0, idOrganization)
      .subscribe((response: any) => {
        this.allCategoriesLoaded = response.last;

        this.router.navigate([`inicio/${idOrganization}/categorias`], {
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
            organization: this.currentOrganization,
          },
        });
      });
  }
}
