import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() title: string = '';
  isOpen: boolean = false;

  constructor(private sharingDataService: SharingDataService) {}

  ngOnInit(): void {
    this.sharingDataService.onOpenCloseModal.subscribe((isOpen: boolean) => {
      this.isOpen = isOpen;
    });
  }

  closeModal(): void {
    this.sharingDataService.onOpenCloseModal.emit(false);
  }
}
