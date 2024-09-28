import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _handlerLoginEventEmitter=new EventEmitter();
  private _registerUserEventEmitter=new EventEmitter();
  private _updateUserEvenEmitter=new EventEmitter();
  private _errorRegisterEventEmitter=new EventEmitter();
  private _popperUpdateUserEventEmitter=new EventEmitter();
  constructor() { }

  get popperUpdateUserEventEmitter(){
    return this._popperUpdateUserEventEmitter;
  }

  get handlerLoginEventEmitter(){
    return this._handlerLoginEventEmitter;
  }

  get registerUserEventEmitter(){
    return this._registerUserEventEmitter;
  }

  get errorRegisterEventEmitter(){
    return this._errorRegisterEventEmitter;
  }

  get updateUserEvenEmitter(){
    return this._updateUserEvenEmitter;
  }
}
