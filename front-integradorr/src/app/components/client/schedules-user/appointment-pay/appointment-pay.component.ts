import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-appointment-pay',
  standalone: true,
  imports: [],
  templateUrl: './appointment-pay.component.html',
  styleUrl: './appointment-pay.component.scss'
})
export class AppointmentPayComponent {
  @Input() schedule: any = null;
}
