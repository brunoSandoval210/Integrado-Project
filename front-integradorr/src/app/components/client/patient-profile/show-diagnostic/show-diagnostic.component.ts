import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-diagnostic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-diagnostic.component.html',
  styleUrl: './show-diagnostic.component.scss'
})
export class ShowDiagnosticComponent {
  @Input() appointment: any;

}
