import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { categoriasDto } from '@shared/models/categoriaDto';
import { CategoriasService } from '@shared/services/categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  public categorias!: categoriasDto;
  public tableData: any[] = [];
  public modalTitle: string = '¿Desea eliminar la sede?';
  public modalTitleDelete: string = 'Información';
  public modalMessageDelete: string =
    'Existen usuarios o inscripciones vigentes asociados a esta categoría';
  public modalMessage: string =
    'Si eliminas esta Categoría no podremos recuperar sus datos';
  public modalSwitch: boolean = false;
  public modalDelete: boolean = false;
  public categoriasPerPage: number = 5;
  public allCategoriasPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number;
  public listName: any[] = [];
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriasService
  ) {}

  ngOnInit() {
    this.fetchCategorias(0, '');
  }

  openModal(id: number) {
    this.modalSwitch = true;
    this.idNumber = id;
  }

  openNotDelete() {
    this.modalDelete = true;
  }

  backToFirst() {
    this.currentPage = 1;
  }

  deleteCategoriasById(id: number) {
    this.closeModal();
    this.categoriaService.deleteCategoriaById(id).subscribe((response) => {
      if (response == true) {
        this.ngOnInit();
        this.backToFirst();
      } else {
        this.openNotDelete();
      }
    });
  }

  closeModal() {
    this.modalSwitch = false;
  }

  closeDeleteModal() {
    this.modalDelete = false;
  }

  fetchCategorias(page: number, searchTerm: string) {
    this.categoriaService
      .getCategoria(page, this.categoriasPerPage, searchTerm)
      .subscribe((response) => {
        this.tableData = response.content;
        this.allCategoriasPages = response.totalPages;
      });
  }

  onCategoriaPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.fetchCategorias(startPage, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.fetchCategorias(0, searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.fetchCategorias(0, searchTerm);
    this.currentPage = 1;
  }

  goEdit(id: number) {
    this.tableData.forEach((response) => {
      this.listName.push(response.nombre);
    });
    this.router.navigate(['editar'], {
      relativeTo: this.route,
      queryParams: { id: id, list: this.listName },
    });
  }

  goCreate() {
    this.tableData.forEach((response) => {
      this.listName.push(response.nombre);
    });
    this.router.navigate(['crear'], {
      relativeTo: this.route,
      queryParams: {
        list: this.listName,
      },
    });
  }
}
