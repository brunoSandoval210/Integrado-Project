import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.scss'
})
export class SearchUserComponent implements OnInit{
  usersForFilter: any[] = [];
  searchQuery: string = '';
  errorMessage: string = '';

  private searchSubject: Subject<string> = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Subscribirse al Subject con debounceTime
    this.searchSubject
      .pipe(debounceTime(300)) // 300ms de espera después del último input
      .subscribe((query) => {
        this.executeSearch(query);
      });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchQuery); // Emitir el valor actual del input
  }

  private executeSearch(query: string): void {
    if (query.trim() === '') {
      this.usersForFilter = [];
      this.errorMessage = '';
      return;
    }

    this.userService.getUsersFilterByDni(query).subscribe(
      (response) => {
        this.usersForFilter = response;
        this.errorMessage = '';
        console.log('Users:', this.usersForFilter);
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = error.error?.message;
        this.usersForFilter = [];
      }
    );
  }

  onSelectUser(user: any): void {
    console.log('Usuario seleccionado:', user);
    this.searchQuery = `${user.name} - ${user.dni}`;
    this.usersForFilter = []; // Ocultar el desplegable
  }
}

  // searchQuery: string = '';
  // filterDate: string = '';
  // filterSpecialty: string = '';
  // filterDoctor: string = '';

  // specialties: string[] = ['Cardiología', 'Neurología', 'Pediatría', 'Traumatología'];

  // records = [
  //   { date: '2024-11-01', specialty: 'Cardiología', doctor: 'Dr. Pérez' },
  //   { date: '2024-11-05', specialty: 'Neurología', doctor: 'Dr. Gómez' },
  //   // Agrega más registros
  // ];

  // filteredRecords = [...this.records];

  // onSearch() {
  //   this.filterRecords();
  // }

  // onFilterChange() {
  //   this.filterRecords();
  // }

  // filterRecords() {
  //   this.filteredRecords = this.records.filter(record => {
  //     return (
  //       (this.searchQuery ? record.specialty.includes(this.searchQuery) || record.doctor.includes(this.searchQuery) : true) &&
  //       (this.filterDate ? record.date === this.filterDate : true) &&
  //       (this.filterSpecialty ? record.specialty === this.filterSpecialty : true) &&
  //       (this.filterDoctor ? record.doctor.includes(this.filterDoctor) : true)
  //     );
  //   });
  // }

  // viewDetails(record: any) {
  //   alert(`Detalles del registro:\nFecha: ${record.date}\nEspecialidad: ${record.specialty}\nMédico: ${record.doctor}`);
  // }

