import { EventEmitter, Injectable } from '@angular/core';
import { SideNavToggle } from '../models/buttons';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  constructor() { }

  private _onToggleSideNav:EventEmitter<SideNavToggle> = new EventEmitter();
  private _onNumberPage:EventEmitter<number> = new EventEmitter();
  //Paginacion de la tabla
  private _onpageSizeChange: EventEmitter<number> = new EventEmitter<number>()
  //Evento para actualizar la tabla despues de crear un horario
  private _onScheduleCreated = new EventEmitter<void>();
  //Evento para actualizar la tabla despues de crear un horario
  private _onScheduleUpdate = new EventEmitter<void>();
  //Evento para manejar el abrir y cerrar del modal
  private _onOpenCloseModal = new EventEmitter<boolean>();
  //Evento para manejar la educion
  private _edit = new EventEmitter<any>()
  //Evento para manejar la eliminacion
  private _delete = new EventEmitter<any>();

  get onToggleSideNav(): EventEmitter<SideNavToggle> {
    return this._onToggleSideNav;
  }

  get onNumberPage(): EventEmitter<number> {
    return this._onNumberPage;
  }

  get pageSizeChange(): EventEmitter<number> {
    return this._onpageSizeChange;
  }

  get onScheduleCreated(): EventEmitter<void> {
    return this._onScheduleCreated;
  }

  get onScheduleUpdate(): EventEmitter<void> {
    return this._onScheduleUpdate;
  }

  get onOpenCloseModal(): EventEmitter<boolean> {
    return this._onOpenCloseModal;
  }

  get edit(): EventEmitter<any> {
    return this._edit;
  }

  get delete(): EventEmitter<any> {
    return this._delete;
  }
}
