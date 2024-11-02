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

@Component({
  selector: 'app-schedules-user',
  standalone: true,
  imports: [
    TableComponent,
    PaginationComponent
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
    private authService: AuthService,
    private appointmentService: AppointmentService
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
        console.log('Selected schedule:', this.selectedSchedule);
        this.createAppointment(this.selectedSchedule);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  resetFilters(): void {
    this.filters = {
      today: this.filters.today,
      filterDay: this.filters.filterDay,
      idUser: this.filters.idUser,
      status: this.filters.status,
      statusSchedule: this.filters.statusSchedule
    };
    this.filterPagination = {
      page: this.currentPage - 1,
      size: this.pageSize
    };
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
    this.scheduleService.getSchedules(filters).subscribe((response: any) => {
      this.schedules = response.content;
      this.totalItems = response.totalElements;
    });
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

  createAppointment(selectedSchedule: any): void {
    const appointment = {
      statusAppointment: 'CONFIRMADA',
      userId: this.authService.getUserId(),
      scheduleId: selectedSchedule.id
    };
    this.appointmentService.createAppointment(appointment).subscribe(
      response => {
        console.log('Appointment created successfully', response);
        Swal.fire({
          icon: 'success',
          title: 'Cita creada',
          text: 'La cita ha sido creada exitosamente.'
        });
      },
      error => {
        console.error('Error creating appointment', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear la cita.'
        });
      }
    );
  }
}