import { Component, Input } from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() columns: { key: string, label: string }[] = [];
  @Input() data: any[] = [];
  @Input() pageSize: number = 10;
  

  constructor(
    private sharingDataService: SharingDataService) { }

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

  // En table.component.ts
  getValue(row: any, key: string): any {
    return key.split('.').reduce((acc, part) => acc && acc[part], row);
  }

}