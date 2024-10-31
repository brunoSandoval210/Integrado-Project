import { EventEmitter, Injectable } from '@angular/core';
import { SideNavToggle } from '../models/buttons';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  constructor() { }

  private _onToggleSideNav:EventEmitter<SideNavToggle> = new EventEmitter();
  private _onNumberPage:EventEmitter<number> = new EventEmitter();
  private _onpageSizeChange: EventEmitter<number> = new EventEmitter<number>()
  private _onScheduleCreated = new EventEmitter<void>();

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
}
