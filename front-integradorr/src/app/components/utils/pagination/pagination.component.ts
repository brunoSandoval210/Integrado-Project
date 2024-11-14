import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';
import { CeilPipe } from '../celi/ceil.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CeilPipe,
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;

  constructor(
    private sharingDataService: SharingDataService
  ) {}

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.sharingDataService.onNumberPage.emit(page);
    }
  }
  
}
