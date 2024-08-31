import { Component } from '@angular/core';
import { FilterDateComponent } from '../filter/filter-date/filter-date.component';
import { FilterDoctorComponent } from '../filter/filter-doctor/filter-doctor.component';

@Component({
  selector: 'app-appointments-booked',
  standalone: true,
  imports: [FilterDateComponent,FilterDoctorComponent],
  templateUrl: './appointments-booked.component.html',
  styleUrl: './appointments-booked.component.scss'
})
export class AppointmentsBookedComponent {

}
