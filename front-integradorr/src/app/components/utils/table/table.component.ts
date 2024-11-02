import { Component, Input } from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: { key: string, label: string }[] = [];
  @Input() data: any[] = [];
  @Input() pageSize: number = 10;
  userRole: string = '';

  constructor(
    private sharingDataService: SharingDataService,
    private authService: AuthService
  ) { 
    this.userRole = this.authService.user.role.name; // Asegúrate de obtener el nombre del rol correctamente
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
}