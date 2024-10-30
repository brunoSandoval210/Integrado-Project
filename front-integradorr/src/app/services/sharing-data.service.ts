import { EventEmitter, Injectable } from '@angular/core';
import { SideNavToggle } from '../models/buttons';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  constructor() { }

  private _onToggleSideNav:EventEmitter<SideNavToggle> = new EventEmitter();

  get onToggleSideNav(): EventEmitter<SideNavToggle> {
    return this._onToggleSideNav;
  }
}
