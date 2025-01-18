import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { SharingDataService } from '../../../services/sharing-data.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../utils/table/table.component';
import { PaginationComponent } from '../../utils/pagination/pagination.component';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    PaginationComponent
  ],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss'
})
export class DoctorProfileComponent implements OnInit{
  appointments: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedAppointment: any = null;

  currentDateTime: Date = new Date();
  formattedDate: string = '';

  appointmentsFilter: any = {
    idUser: undefined,
    date: undefined
  }

  filterPagination = {
    page: this.currentPage - 1,
    size: this.pageSize
  };

  constructor(
    private appointmentService: AppointmentService,
    private sharingDataService: SharingDataService,
    private authService: AuthService
  ) { 
    this.formattedDate = this.formatDate(this.currentDateTime);
    this.appointmentsFilter = {
      idUser: undefined,
      date: this.formattedDate
    }
  }

  columns = [
    { key: 'statusAppointment', label: 'Estado de la cita' },
    { key: 'user.lastNameAndLastname', label: 'Nombre y apellidos del paciente'},
    { key: 'user.dni', label: 'DNI del paciente'},
    { key: 'schedule.date', label: 'Fecha' },
    { key: 'schedule.hourStart', label: 'Hora de inicio' },
    { key: 'schedule.hourEnd', label: 'Hora de fin' },
    { key: 'actions', label: 'Acciones' }

  ]

  ngOnInit(): void {
    this.getAppointments();
    this.sharingDataService.pageSizeChange.subscribe(newSize => {
      this.pageSize = newSize;
      this.filterPagination.size = newSize;
      this.currentPage = 1;
      this.filterPagination.page = 0;
      this.getAppointments();
    });
    this.sharingDataService.onNumberPage.subscribe(page => {
      this.currentPage = page;
      this.filterPagination.page = page - 1;
      this.getAppointments();
    });
    // this.sharingDataService.showDiagnostic.subscribe(row => {
    //   this.selectedAppointment = row;
    //   this.openModal(true, row);
    // });
    // this.sharingDataService.reprogramingAppointments.subscribe(row => {
    //   this.selectedAppointment = row;
    //   this.openModal(false, row);

    // });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getAppointments() {
    const filters = { ...this.appointmentsFilter, ...this.filterPagination };
    filters.idUser = this.authService.getUserId();
    this.appointmentService.getAppointmentsForDay(filters)
      .subscribe((response: any) => {
        this.appointments = response.content;
        this.totalItems = response.totalElements;
        console.log(this.appointments);
      },
        error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener las citas',
            text: 'Ocurrió un error al obtener las citas, por favor inténtalo de nuevo'
          });
        }
      );
  }

  resetFilters(): void {
    this.appointmentsFilter.date = this.formattedDate;
    this.getAppointments();
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.filterPagination.size = newSize;
    this.currentPage = 1;
    this.filterPagination.page = 0;
    this.getAppointments();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filterPagination.page = this.currentPage - 1;
    this.getAppointments();
  }

  openModal(editMode: boolean = false, appointment: any = null): void {
    this.isEditMode = editMode;
    const appointmentt = this.appointments.find(app => app.id === appointment.id);
    this.selectedAppointment = appointmentt;
    console.log(this.selectedAppointment);
    this.sharingDataService.onOpenCloseModal.emit(true);
  }
  
  closeModal(): void {
    this.sharingDataService.onOpenCloseModal.emit(false);
    this.isEditMode = false;
    this.selectedAppointment = null;
  }
  
}
