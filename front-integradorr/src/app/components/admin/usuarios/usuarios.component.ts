import { Component, OnInit } from '@angular/core';
import { UserFilters } from '../../../models/user';
import { FilterPagination } from '../../../models/filters';
import { UserService } from '../../../services/user.service';
import { SharingDataService } from '../../../services/sharing-data.service';
import { TableComponent } from '../../utils/table/table.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PaginationComponent } from '../../utils/pagination/pagination.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PopupComponent } from '../../utils/popup/popup.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    TableComponent, 
    PaginationComponent,
    FormsModule,
    RegisterUserComponent,
    EditUserComponent,
    PopupComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{
  users: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedUser: any = null;

  filters: UserFilters = {
    roleId: 0
  };
  filterPagination: FilterPagination = {
    page: this.currentPage - 1,
    size: this.pageSize
  };

  constructor(
    private userService: UserService,
    private sharingDataService: SharingDataService
  ) {}

  columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'lastname', label: 'Apellido' },
    { key: 'email', label: 'Email' },
    { key: 'dni', label: 'DNI' },
    { key: 'role.name', label: 'Rol' },
    { key: 'specialization.name', label: 'Especialización' },
    { key: 'status', label: 'Estado'},
    { key: 'actions', label: 'Acciones' }
  ];

  ngOnInit(): void {
    this.getUsers();
    this.sharingDataService.onNumberPage.subscribe(page => {
      this.currentPage = page;
      this.filterPagination.page = page - 1;
      this.getUsers();
    });
    this.sharingDataService.pageSizeChange.subscribe(newSize => {
      this.pageSize = newSize;
      this.filterPagination.size = newSize;
      this.currentPage = 1;
      this.filterPagination.page = 0;
      this.getUsers();
    });
    this.sharingDataService.onScheduleCreated.subscribe(() => {
      this.getUsers();
    });
    this.sharingDataService.onScheduleUpdate.subscribe(() => {
      this.onUserUpdated();
    });
    this.sharingDataService.edit.subscribe(schedule => {
      this.openModal(true, schedule);
    });
    this.sharingDataService.delete.subscribe(schedule => {
      this.onDeleteUser(schedule);
    });
    this.getUsers();
  }

  resetFilters(): void {
    this.filters = {
      roleId: 0
      // status: undefined
    };
    this.filterPagination = {
      page: 0,
      size: this.pageSize
    };
    this.getUsers();
  }
  
  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.filterPagination.size = newSize;
    this.currentPage = 1;
    this.filterPagination.page = 0;
    this.getUsers();
  }
  
  openModal(editMode: boolean = false, user: any = null): void {
    this.isEditMode = editMode;
    this.selectedUser = user;
    this.sharingDataService.onOpenCloseModal.emit(true);
  }
  
  closeModal(): void {
    this.sharingDataService.onOpenCloseModal.emit(false);
    this.isEditMode = false;
    this.selectedUser = null;
  }

  getUsers(): void {
    const filters = { ...this.filters, ...this.filterPagination };
    this.userService.getUsers(filters).subscribe(
      data => {
        this.users = data.content;
        this.totalItems = data.totalElements;
        console.log('Users', this.users);
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }
  
  onUserCreated(): void {
    this.closeModal();
    this.getUsers();
    Swal.fire({
      icon: 'success',
      title: 'Horario creado',
      text: 'El horario ha sido creado exitosamente.'
    });
  }
  
  onUserUpdated(): void {
    this.closeModal();
    this.getUsers();
    Swal.fire({
      icon: 'success',
      title: 'Horario actualizado',
      text: 'El horario ha sido actualizado exitosamente.'
    });
  }

  onDeleteUser(user: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe(
          response => {
            Swal.fire(
              'Eliminado!',
              // 'El usuario ha sido eliminado.',
              response.message,
              'success'
            );
            this.getUsers();
          },
          error => {
            Swal.fire(
              'Error!',
              // 'Hubo un problema al eliminar el usuario.',
              error.error,
              'error'
            );
          }
        );
      }
    });
  }
}
