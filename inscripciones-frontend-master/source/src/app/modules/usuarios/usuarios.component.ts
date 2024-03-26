import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SwitchModalService } from '@components/modals/modal.service';
import { UsuarioService } from '@modules/usuarios/usuario.service';
import { usuarioDto } from '@shared/models/usuarioDto';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public usuarios: usuarioDto[] = [];
  public tableData: any[] = [];
  public modalTitle: string = '¿Desea eliminar el usuario?';
  public modalMessage: string =
    'Si eliminas este Usuario no podremos recuperar sus datos';
  public currentPage: number = 1;
  public modalSwitch: boolean = false;
  public idNumber: number = 0;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private switchModalService: SwitchModalService
  ) {}

  ngOnInit() {
    this.fetchUsers(0, '');
    this.switchModalService.$modal.subscribe((value) => {
      this.modalSwitch = value;
    });
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuarioById(id).subscribe((response) => {
      this.ngOnInit();
    });
    this.closeModal();
  }

  openModal(id: number) {
    this.modalSwitch = true;
    this.idNumber = id;
  }

  closeModal() {
    this.switchModalService.$modal.emit(false);
  }

  fetchUsers(page: number, searchTerm: string) {
    this.usuarioService
      .getUsuarios(page, this.itemsPerPage, searchTerm)
      .subscribe((response) => {
        this.tableData = response.content;
        this.allPages = response.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.fetchUsers(startPage, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.fetchUsers(0, searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.fetchUsers(0, searchTerm);
    this.currentPage = 1;
  }

  deleteUsuarioById(id: number) {
    this.usuarioService.deleteUsuarioById(id).subscribe((response) => {
      this.ngOnInit();
      this.onPageChange(1);
    });
  }

  goEdit(id: number) {
    this.router.navigate(['editar'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
}
