import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  @Input() columns: { key: string, label: string }[] = [];
  @Input() data: any[] = [];
  @Input() pageSize: number = 10;
  userRole: string = '';

  @Input() citaUser: boolean=false;

  constructor(
    private sharingDataService: SharingDataService,
    private authService: AuthService
  ) { 
    this.userRole = this.authService.user.role.name; 
  }

  ngOnInit(): void {
      console.log(this.citaUser);
  }

  onPageSizeChange(event: Event): void {
    const newSize = +(event.target as HTMLSelectElement).value;
    this.sharingDataService.pageSizeChange.emit(newSize);
  }

  onEdit(row: any): void {
    this.sharingDataService.edit.emit(row);
  }

  onDelete(row: any): void {
    this.sharingDataService.delete.emit(row);
  }

  transformStatus(status: string): string {
    return status === "1" ? 'Activo' : 'Inactivo';
  }

  getValue(row: any, key: string): any {
    return key.split('.').reduce((acc, part) => acc && acc[part], row);
  }

  onShowDiagnostico(row: any): void {
    this.sharingDataService.showDiagnostic.emit(row);
  }

  onReprogramingAppointments(row: any): void {
    const now = new Date();
    const appointmentDate = new Date(row.schedule.date + ' ' + row.schedule.hourStart);

    if (appointmentDate < now) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Esa cita ya no se puede reprogramar porque su fecha ya pasó.'
      });
      return;
    }

    const diffInHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffInHours > 24) {
      this.sharingDataService.reprogramingAppointments.emit(row);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede reprogramar la cita con menos de 24 horas para que se de la cita.'
      });
    }
  }
}