import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../utils/table/table.component';
import { ScheduleService } from '../../../services/schedule.service';
import { FormsModule } from '@angular/forms';
import { CeilPipe } from '../../utils/celi/ceil.pipe';
import { PaginationComponent } from '../../utils/pagination/pagination.component';
import { SharingDataService } from '../../../services/sharing-data.service';
import { ScheduleFilters } from '../../../models/schedule';
import { CommonModule } from '@angular/common';
import { RegisterScheduleComponent } from './popups/register-schedule/register-schedule.component';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { PopupComponent } from '../../utils/popup/popup.component';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [TableComponent,
    FormsModule,
    CeilPipe,
    PaginationComponent,
    CommonModule,
    RegisterScheduleComponent,
    PopupComponent],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {
  schedules: any[] = [];
  usersFilter: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedSchedule: any = null;

  filters: ScheduleFilters = {
    page: 0,
    size: 10,
    today: undefined,
    filterDay: undefined,
    idUser: undefined,
    status: 1,
    statusSchedule: undefined
  };

  constructor(
    private scheduleService: ScheduleService,
    private sharingDataService: SharingDataService,
    private userService: UserService
  ) { }

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
      this.getSchedules();
    });
    this.sharingDataService.pageSizeChange.subscribe(newSize => {
      this.pageSize = newSize;
      this.currentPage = 1; // Reset to first page
      this.getSchedules();
    });
    this.sharingDataService.onScheduleCreated.subscribe(() => {
      this.onScheduleCreated();
    });
    this.getUsers();
  }

  getSchedules(): void {
    this.filters.page = this.currentPage - 1;
    this.filters.size = this.pageSize;
    this.scheduleService.getSchedules(this.filters).subscribe(
      data => {
        this.schedules = data.content;
        this.totalItems = data.totalElements;
      },
      error => {
        console.error('Error fetching schedules', error);
      }
    );
  }

  resetFilters(): void {
    this.filters = {
      page: 0,
      size: 10,
      today: undefined,
      filterDay: undefined,
      idUser: undefined,
      status: undefined,
      statusSchedule: undefined
    };
    this.getSchedules();
  }

  openModal(editMode: boolean = false, schedule: any = null): void {
    this.isEditMode = editMode;
    this.selectedSchedule = schedule;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.selectedSchedule = null;
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

  getUsers(): void {
    const filters = {
      page: this.currentPage - 1,
      size: this.pageSize,
      roleId: 3
    };
    this.userService.getUsers(filters).subscribe(
      data => {
        this.usersFilter = data.content;
        this.totalItems = data.totalElements;
        console.log('Users:', this.usersFilter);
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

  onEditSchedule(schedule: any): void {
    this.openModal(true, schedule);
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 1; // Reset to first page
    this.getSchedules();
  }
}