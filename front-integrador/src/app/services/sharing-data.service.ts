import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _handlerLoginEventEmitter=new EventEmitter();
  private _registerUserEventEmitter=new EventEmitter();
  private _errorRegisterEventEmitter=new EventEmitter();

  constructor() { }

  get handlerLoginEventEmitter(){
    return this._handlerLoginEventEmitter;
  }

  get registerUserEventEmitter(){
    return this._registerUserEventEmitter;
  }

  get errorRegisterEventEmitter(){
    return this._errorRegisterEventEmitter;
  }
}
