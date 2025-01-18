import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../utils/table/table.component';
import { PaginationComponent } from '../../utils/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../utils/popup/popup.component';
import { AppointmentFilter } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { SharingDataService } from '../../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { ShowDiagnosticComponent } from './show-diagnostic/show-diagnostic.component';
import { ReprograminAppointmentComponent } from './reprogramin-appointment/reprogramin-appointment.component';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    TableComponent,
    PaginationComponent,
    FormsModule,
    PopupComponent,
    ShowDiagnosticComponent,
    ReprograminAppointmentComponent
  ],
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  appointments: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedAppointment: any = null;

  citaUser: boolean = true;


  appointmentsFilter: AppointmentFilter = {
    idUser: undefined,
    status: 1,
    statusAppointment: undefined
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
  }

  columns = [
    { key: 'statusAppointment', label: 'Estado de la cita' },
    { key: 'schedule.date', label: 'Fecha' },
    { key: 'schedule.hourStart', label: 'Hora de inicio' },
    { key: 'schedule.hourEnd', label: 'Hora de fin' },
    { key: 'schedule.doctorName', label: 'Doctor' },
    { key: 'schedule.specialty', label: 'Especialidad' },
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
    this.sharingDataService.showDiagnostic.subscribe(row => {
      this.selectedAppointment = row;
      this.openModal(true, row);
    });
    this.sharingDataService.reprogramingAppointments.subscribe(row => {
      this.selectedAppointment = row;
      this.openModal(false, row);

    });
  }

  getAppointments() {
    const filters = { ...this.appointmentsFilter, ...this.filterPagination };
    filters.idUser = this.authService.getUserId();
    this.appointmentService.getAppointmentsWithFilters(filters)
      .subscribe((response: any) => {
        this.appointments = response.content;
        this.totalItems = response.totalElements;
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
    this.appointmentsFilter.statusAppointment = undefined;
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