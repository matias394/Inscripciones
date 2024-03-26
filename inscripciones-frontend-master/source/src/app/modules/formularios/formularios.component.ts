import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormulariosService } from '@modules/formularios/formularios.service';
import { SwitchModalService } from '@components/modals/modal.service';
import { FormularioService } from '@modules/formularios/formularios/services/formulario.service';
import { Formulario } from '@modules/formularios/formularios/modelos/formulario';
import { PrevisualizandoFormularioService } from '@modules/formularios/formularios/services/previsualizando-formulario.service';
import { formularioPrevisualizacion } from '@modules/formularios/formularios/urls-formulario';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.scss'],
})
export class FormulariosComponent implements OnInit {
  public tableData: any[] = [];
  public listFiltered: any[] = [];
  public listName: any[] = [];
  public modalSwitch: boolean;
  public idNumber: number;
  public itemsPerPage: number = 5;
  public currentPage: number = 1;
  public allPages: number = 0;
  public filteredData: any[] = [];
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';
  parse: Formulario;

  constructor(
    private formulariosService: FormulariosService,
    private router: Router,
    private route: ActivatedRoute,
    private switchModalService: SwitchModalService,
    private serviceForm: FormularioService,
    private previsualizacion: PrevisualizandoFormularioService
  ) {}

  ngOnInit() {
    this.fetchItems(0, '');
    this.switchModalService.$modal.subscribe((value) => {
      this.modalSwitch = value;
    });
  }

  openModal(id: number) {
    this.modalSwitch = true;
    this.idNumber = id;
  }

  closeModal() {
    this.switchModalService.$modal.emit(false);
  }

  backToFirst() {
    this.currentPage = 1;
  }

  fetchItems(page: number, searchTerm: string) {
    this.formulariosService
      .fetchFormularios(page, this.itemsPerPage, searchTerm)
      .subscribe((response) => {
        this.tableData = response.content;
        this.allPages = response.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.fetchItems(startPage, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.fetchItems(0, searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.fetchItems(0, searchTerm);
    this.currentPage = 1;
  }
  deleteUsuarioById(id: number) {
    // this.formulariosService.deleteById(id).subscribe((response) => {
    this.ngOnInit();
    // });
  }
  goPrevisualizar(id: string) {
    this.getForm(id);
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
  goEdit(id: string, idTabla: string) {
    this.tableData.forEach((response) => {
      this.listName.push(response.nombre);
    });
    this.router.navigate(['editar/' + id], {
      relativeTo: this.route,
      queryParams: {
        idTabla: idTabla,
        list: this.listName,
      },
    });
  }

  getForm(id) {
    let parese;
    this.formulariosService.fetchFormulario(id).subscribe((result) => {
      parese = result;
      parese = this.serviceForm.parseBack(parese);
      this.previsualizacion.setFormulario({
        nombre: parese.nombre,
        secciones: parese.campos as any,
      });

      let newRelativeUrl = this.router.createUrlTree([
        formularioPrevisualizacion,
      ]);
      let baseUrl = window.location.href.replace(this.router.url, '');

      if (!this.previsualizacion.isVentanaAbierta()) {
        window.open(baseUrl + newRelativeUrl, '_blank');
      }
    });
  }

  crear() {
    this.router.navigate(['crear'], {
      relativeTo: this.route,
    });
  }
}
