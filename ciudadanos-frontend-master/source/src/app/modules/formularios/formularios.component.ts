import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// import { usuarioDto } from '@shared/models/usuarioDto';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SwitchModalService } from '@components/modals/modal.service';
import { FormulariosService } from './formularios.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css'],
})
export class FormulariosComponent implements OnInit {
  // public usuarios: usuarioDto[] = [];
  public tableData: any[] = [
    {
      codigo: '00001',
      nombre: 'Primer Formulario',
    },
    {
      codigo: '00002',
      nombre: 'Segundo Formulario',
    },
  ];
  public listFiltered: any[] = [];
  public modalSwitch: boolean;
  public idNumber: number;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  searchTerm$ = new Subject<string>();

  constructor(
    private formulariosService: FormulariosService,
    private router: Router,
    private route: ActivatedRoute,
    private switchModalService: SwitchModalService
  ) {}

  ngOnInit() {
    // this.fetchItems();
    this.filterList();
    this.onPageChange();
    this.switchModalService.$modal.subscribe((value) => {
      this.modalSwitch = value;
    });
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.listFiltered = this.tableData.slice(startItem, endItem);
  }

  openModal(id: number) {
    this.modalSwitch = true;
    this.idNumber = id;
  }

  closeModal() {
    this.switchModalService.$modal.emit(false);
  }

  filterList(): void {
    this.searchTerm$.subscribe((term) => {
      this.listFiltered = this.tableData
        .filter((item) =>
          item.nombre.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, this.itemsPerPage);
    });
  }

  fetchItems() {
    // this.formulariosService.getItem().subscribe((response) => {
    // this.tableData = response.content;
    // this.listFiltered = this.tableData;
    // this.onPageChange();
    // this.allPages = Math.ceil(this.tableData.length / this.itemsPerPage);
    // });
  }

  deleteUsuarioById(id: number) {
    // this.formulariosService.deleteById(id).subscribe((response) => {
    this.ngOnInit();
    // });
  }

  goEdit(id: number) {
    this.router.navigate(['editar'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
}
