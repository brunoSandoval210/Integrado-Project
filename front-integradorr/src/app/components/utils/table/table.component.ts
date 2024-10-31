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
}