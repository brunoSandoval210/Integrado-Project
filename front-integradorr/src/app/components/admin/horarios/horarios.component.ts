import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../utils/table/table.component';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.scss'
})
export class HorariosComponent implements OnInit {

  columns = [
    { key: 'id', label: '#' },
    { key: 'first', label: 'First' },
    { key: 'last', label: 'Last' },
    { key: 'handle', label: 'Handle' }
  ];

  data = [
    { id: 1, first: 'Mark', last: 'Otto', handle: 'mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: 'fat' },
    { id: 3, first: 'Larry', last: 'the Bird', handle: 'twitter' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
