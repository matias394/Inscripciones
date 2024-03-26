import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesService } from '@modules/roles/roles.service';
import { rolesDto } from '@shared/models/rolesDto';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles!: rolesDto;
  public tableData: any[] = [];
  public modalTitle: string = '¿Desea eliminar el rol?';
  public modalMessage: string =
    'Si eliminas este Rol no podremos recuperar sus datos';
  public modalSwitch: boolean = false;
  public rolesPerPage: number = 5;
  public allRolesPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number;
  public filteredData: any[] = [];
  searchTerm$ = new Subject<string>();
  listFiltered: any[] = [];

  constructor(
    private rolesService: RolesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchRoles();
    this.filterList();
  }

  openModal(id: number) {
    this.modalSwitch = true;
    this.idNumber = id;
  }

  backToFirst() {
    this.currentPage = 1;
  }

  deleteRolesById(id: number) {
    this.rolesService.deleteRoles(id).subscribe((response) => {
      this.ngOnInit();
      this.backToFirst();
    });
    this.closeModal();
  }

  closeModal() {
    this.modalSwitch = false;
  }

  fetchRoles() {
    this.rolesService.getRoles().subscribe((response) => {
      this.tableData = response.content;
      this.filteredData = this.tableData;
      this.onRolesPageChange();
      this.allRolesPages = Math.ceil(
        this.filteredData.length / this.rolesPerPage
      );
    });
  }

  // onRolesPageChange(page: number): void {
  //   this.currentPage = page;
  //   const startPage = page - 1;
  //   this.rolesService
  //     .getRoles(startPage, this.rolesPerPage, '')
  //     .subscribe((response) => {
  //       this.tableData = response.content;
  //     });
  // }

  onRolesPageChange(page: number = 1): void {
    this.currentPage = page;
    const startItem = (page - 1) * this.rolesPerPage;
    const endItem = page * this.rolesPerPage;
    this.listFiltered = this.filteredData.slice(startItem, endItem);
  }

  filterList(): void {
    this.searchTerm$.subscribe((term) => {
      if (term === '') {
        this.listFiltered = this.tableData.slice(0, this.rolesPerPage);
        this.filteredData = this.tableData;
        this.allRolesPages = Math.ceil(
          this.tableData.length / this.rolesPerPage
        );
        this.currentPage = 1;
        this.onRolesPageChange();
        this.backToFirst();
      } else {
        this.currentPage = 1;
        this.listFiltered = this.tableData.filter((item: rolesDto) => {
          const termLower = term.toLowerCase();
          return Object.values(item).some((value) => {
            if (typeof value === 'string') {
              const valueLower = value.toLowerCase();
              return valueLower.includes(termLower);
            }
            return false;
          });
        });
        this.filteredData = this.listFiltered;
        this.allRolesPages = Math.ceil(
          this.filteredData.length / this.rolesPerPage
        );
        this.onRolesPageChange();
        this.backToFirst();
      }
    });
  }

  goEdit(id: number) {
    this.router.navigate(['editar'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
}
