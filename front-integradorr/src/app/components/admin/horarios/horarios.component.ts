import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../utils/table/table.component';
import { ScheduleService } from '../../../services/schedule.service';
import { FormsModule } from '@angular/forms';
import { CeilPipe } from '../../utils/celi/ceil.pipe';
import { PaginationComponent } from '../../utils/pagination/pagination.component';
import { SharingDataService } from '../../../services/sharing-data.service';
import { ScheduleFilter, ScheduleFilters } from '../../../models/schedule';
import { CommonModule } from '@angular/common';
import { RegisterScheduleComponent } from './register-schedule/register-schedule.component';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { PopupComponent } from '../../utils/popup/popup.component';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';
import { FilterPagination } from '../../../models/filters';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [
    TableComponent, 
    FormsModule,
    CeilPipe,
    PaginationComponent,
    CommonModule,
    RegisterScheduleComponent,
    EditScheduleComponent,
    PopupComponent],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {
  schedules: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedSchedule: any = null;

  usersFilter: any[] = []; // Cambiar el tipo a array para almacenar los usuarios filtrados

  filtersSchedule : ScheduleFilter= {
    today: undefined,
    filterDay: undefined,
    idUser: undefined,
    status: 1,
    statusSchedule: undefined
  };

  filterPagination: FilterPagination = {
    page: this.currentPage - 1,
    size: this.pageSize
  };

  constructor(
    private scheduleService: ScheduleService,
    private sharingDataService: SharingDataService,
    private userService: UserService
  ) {}

  columns = [
    { key: 'doctorName', label: 'Nombre del doctor' },
    { key: 'specialty', label: 'Especialidad' },
    { key: 'date', label: 'Día' },
    { key: 'hourStart', label: 'Hora de inicio' },
    { key: 'hourEnd', label: 'Hora de fin' },
    { key: 'statusSchedule', label: 'Estado del horario' },
    { key: 'actions', label: 'Acciones' }
  ];

  ngOnInit(): void {
    this.getSchedules();
    this.sharingDataService.onNumberPage.subscribe(page => {
      this.currentPage = page;
      this.filterPagination.page = page - 1;
      this.getSchedules();
    });
    this.sharingDataService.pageSizeChange.subscribe(newSize => {
      this.pageSize = newSize;
      this.filterPagination.size = newSize;
      this.currentPage = 1;
      this.filterPagination.page = 0;
      this.getSchedules();
    });
    this.sharingDataService.onScheduleCreated.subscribe(() => {
      this.onScheduleCreated();
    });
    this.sharingDataService.onScheduleUpdate.subscribe(() => {
      this.onScheduleUpdated();
    });
    this.sharingDataService.edit.subscribe(schedule => {
      this.openModal(true, schedule);
    });
    this.sharingDataService.delete.subscribe(schedule => {
      this.onDeleteSchedule(schedule);
    });
    this.getUsers();
  }
  
  resetFilters(): void {
    this.filtersSchedule = {
      today: undefined,
      filterDay: undefined,
      idUser: undefined,
      status: undefined,
      statusSchedule: undefined
    };
    this.filterPagination = {
      page: 0,
      size: this.pageSize
    };
    this.getSchedules();
  }
  
  onPageSizeChange(newSize:number): void {
    this.pageSize = newSize;
    this.filterPagination.size = newSize;
    this.currentPage = 1;
    this.filterPagination.page = 0;
    this.getSchedules();
  }
  
  openModal(editMode: boolean = false, schedule: any = null): void {
    this.isEditMode = editMode;
    this.selectedSchedule = schedule;
    this.sharingDataService.onOpenCloseModal.emit(true);
  }

  closeModal(): void {
    this.sharingDataService.onOpenCloseModal.emit(false);
    this.isEditMode = false;
    this.selectedSchedule = null;
  }
  
  getSchedules(): void {
    const filters: ScheduleFilters = { ...this.filtersSchedule, ...this.filterPagination };
    this.scheduleService.getSchedules(filters).subscribe(
      data => {
        this.schedules = data.content;
        this.totalItems = data.totalElements;
        console.log('Total Items:', this.totalItems); // Agrega esta línea para depurar
        console.log('Current Page:', this.currentPage); // Agrega esta línea para depurar
      },
      error => {
        console.error('Error fetching schedules', error);
      }
    );
  }

  onScheduleCreated(): void {
    this.closeModal();
    this.getSchedules();
    Swal.fire({
      icon: 'success',
      title: 'Horario creado',
      text: 'El horario ha sido creado exitosamente.'
    });
  }

  onScheduleUpdated(): void {
    this.closeModal();
    this.getSchedules();
    Swal.fire({
      icon: 'success',
      title: 'Horario actualizado',
      text: 'El horario ha sido actualizado exitosamente.'
    });
  }

  getUsers(): void {
    const filters = {
      roleId: 3
    };
    this.userService.getUsers(filters).subscribe(
      data => {
        this.usersFilter = data.content;
        this.totalItems = data.totalElements;
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

  onDeleteSchedule(schedule: any): void {
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
        this.scheduleService.deleteSchedule(schedule.id).subscribe(
          response => {
            console.log('Delete response:', response); // Verificar la respuesta del servidor
            Swal.fire(
              'Eliminado!',
              response.message, // Mostrar el mensaje del servidor
              'success'
            );
            this.getSchedules(); // Actualizar la lista después de la eliminación
          },
          error => {
            console.error('Error deleting schedule:', error); // Verificar el error
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el horario.',
              'error'
            );
          }
        );
      }
    });
  }
}