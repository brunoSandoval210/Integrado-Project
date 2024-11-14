import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduleFilter } from '../../../models/schedule';
import { SharingDataService } from '../../../services/sharing-data.service';
import { ScheduleService } from '../../../services/schedule.service';
import { TableComponent } from '../../utils/table/table.component';
import { PaginationComponent } from '../../utils/pagination/pagination.component';
import { AuthService } from '../../../services/auth.service';
import { AppointmentService } from '../../../services/appointment.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../utils/popup/popup.component';
import { AppointmentPayComponent } from './appointment-pay/appointment-pay.component';
import { AppointmentResumeComponent } from './appointment-resume/appointment-resume.component';

@Component({
  selector: 'app-schedules-user',
  standalone: true,
  imports: [
    TableComponent,
    PaginationComponent,
    CommonModule,
    FormsModule,
    PopupComponent,
    AppointmentPayComponent,
    AppointmentResumeComponent,
  ],
  templateUrl: './schedules-user.component.html',
  styleUrls: ['./schedules-user.component.scss']
})
export class SchedulesUserComponent implements OnInit, OnDestroy {
  schedules: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedSchedule: any = null;

  usersFilter: any[] = [];

  currentDateTime: Date = new Date();

  formattedDate: string = '';
  private subscriptions: Subscription = new Subscription();

  filters: ScheduleFilter;

  filterPagination = {
    page: this.currentPage - 1,
    size: this.pageSize
  };

  constructor(
    private scheduleService: ScheduleService,
    private sharingDataService: SharingDataService,
    private userService: UserService
  ) {
    this.formattedDate = this.formatDate(this.currentDateTime);
    this.filters = {
      today: this.formattedDate,
      filterDay: undefined,
      idUser: undefined,
      status: 1,
      statusSchedule: 'LIBRE'
    };
  }

  columns = [
    { key: 'hourStart', label: 'Hora de inicio' },
    { key: 'hourEnd', label: 'Hora de fin' },
    { key: 'doctorName', label: 'Nombre del doctor' },
    { key: 'specialty', label: 'Especialidad' },
    { key: 'date', label: 'Día' },
    { key: 'actions', label: 'Acciones' }
  ];

  ngOnInit(): void {
    this.getSchedules();
    this.getCurrentDateTime();

    this.subscriptions.add(
      this.sharingDataService.onNumberPage.subscribe(page => {
        this.currentPage = page;
        this.filterPagination.page = page - 1;
        this.getSchedules();
      })
    );

    this.subscriptions.add(
      this.sharingDataService.pageSizeChange.subscribe(newSize => {
        this.pageSize = newSize;
        this.filterPagination.size = newSize;
        this.currentPage = 1;
        this.filterPagination.page = 0;
        this.getSchedules();
      })
    );

    this.subscriptions.add(
      this.sharingDataService.edit.subscribe(schedule => {
        this.selectedSchedule = schedule;
        this.openModal(true, schedule);
      })
    );

    this.sharingDataService.onScheduleUpdate.subscribe(() => {
      this.onCreateSchedule();
    });

    this.sharingDataService.onScheduleCreated.subscribe(() => {
      this.onCreateSchedulePay();
    });


    this.sharingDataService.changeEditMode.subscribe((editMode: boolean) => {
      this.isEditMode = editMode;
    });
    this.getUsers();
  }

  onCreateSchedule(): void {
    this.closeModal();
    this.getSchedules();
  }

  onCreateSchedulePay(): void {
    this.closeModal();
    this.getSchedules();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  resetFilters(): void {
    this.filters = {
      today: this.formattedDate,
      filterDay: undefined,
      idUser: undefined,
      status: 1,
      statusSchedule: 'LIBRE'
    };
    this.filterPagination = {
      page: 0,
      size: this.pageSize
    };
    this.currentPage = 1;
    this.getSchedules();
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.filterPagination.size = newSize;
    this.currentPage = 1;
    this.filterPagination.page = 0;
    this.getSchedules();
  }
  
  getSchedules(): void {
    const filters = {...this.filters, ...this.filterPagination};
    this.scheduleService.getSchedules(filters).subscribe(
      (response: any) => {
        this.schedules = response.content;
        this.totalItems = response.totalElements;
      },
      error => {
        console.error('Error fetching schedules', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los horarios.'
        });
      }
    );
  }

  getUsers(): void {
    const filters = {
      roleId: 3
    };
    this.userService.getUsers(filters).subscribe(
      data => {
        this.usersFilter = data.content;
      },
      error => {
        console.error('Error fetching users', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los usuarios.'
        });
      }
    );
  }

  getCurrentDateTime(): void {
    this.currentDateTime = new Date();
    this.formattedDate = this.formatDate(this.currentDateTime);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getHourRange(schedule: any): string {
    return `${schedule.hourStart} - ${schedule.hourEnd}`;
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
}