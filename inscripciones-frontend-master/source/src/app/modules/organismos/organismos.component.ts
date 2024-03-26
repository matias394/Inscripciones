import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwitchModalService } from '@components/modals/modal.service';
import { OrganismoService } from '@shared/services/organismo.service';

@Component({
  selector: 'app-organismos',
  templateUrl: './organismos.component.html',
  styleUrls: ['./organismos.component.scss'],
})
export class OrganismosComponent implements OnInit {
  constructor(
    private organismoService: OrganismoService,
    private router: Router,
    private route: ActivatedRoute,
    private switchModalService: SwitchModalService
  ) {}
  public tableData: any[] = [];
  public modalTitle: string = '¿Desea eliminar el organismo?';
  public modalMessage: string =
    'Si eliminas este Organismo no podremos recuperar sus datos';
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public idNumber: number = 0;
  public modalSwitch: boolean = false;
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';

  ngOnInit(): void {
    this.fetchOrganismos(0, '');
    this.switchModalService.$modal.subscribe((value) => {
      this.modalSwitch = value;
    });
  }

  fetchOrganismos(page: number, searchTerm: string) {
    this.organismoService
      .getOrganismo(page, this.itemsPerPage, searchTerm)
      .subscribe((response) => {
        this.tableData = response.content;
        this.allPages = response.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.fetchOrganismos(startPage, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.fetchOrganismos(0, searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.fetchOrganismos(0, searchTerm);
    this.currentPage = 1;
  }

  backToFirst() {
    this.currentPage = 1;
  }

  openModal(id: number) {
    this.modalSwitch = true;
    this.idNumber = id;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  goEdit(id: number) {
    this.router.navigate(['editar'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  deleteOrganismo(id: number) {
    this.organismoService.deleteOrganismoById(id).subscribe((response) => {
      this.ngOnInit();
    });
    this.closeModal();
  }
}
