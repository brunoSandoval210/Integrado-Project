import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string="http://localhost:8080/login";
  private _token!:string | undefined;
  private _user:any={
    isAuth:false,
    isAdmin:false,
    isDoctor:false,
    isPatient:false,
    user:undefined
  };

  constructor(private http:HttpClient) { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  loginUser({username,password}:any):Observable<any>{
    return this.http.post<any>(this.url,{username,password});
  }

  set user(user:any){
    this._user = user;
    if (this.isBrowser()) {
      sessionStorage.setItem('login', JSON.stringify(user));
    }
  }

  get user(){
    if (this._user.isAuth) {
      return this._user;
    } else if (this.isBrowser() && sessionStorage.getItem('login') != null) {
      this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
      return this._user;
    }
    return this._user;
  }
  
  set token(token:string){
    this._token = token;
    if (this.isBrowser()) {
      sessionStorage.setItem('token', token);
    }
  }

  get token(){
    if (this._token !== undefined) {
      return this._token;
    } else if (this.isBrowser() && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token!;
  }

  getPayload(token:string){
    if(token !== undefined){
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  isAdmin(){
    return this.user.isAdmin;
  }

  isDoctor(){
    return this.user.isDoctor;
  }

  isAuthenticated(){
    return this.user.isAuth;
  }

  isPatient(){
    return this.user.isPatient;
  }

  getUserRoles() {
    const roles = [];
    if (this.isAdmin()) roles.push('admin');
    if (this.isDoctor()) roles.push('doctor');
    if (this.isPatient()) roles.push('cliente');
    return roles;
  }

  logout(){
    this._token = undefined;
    this._user = {
      isAuth: false,
      isAdmin: false,
      isDoctor: false,
      isPatient: false,
      user: undefined
    };
    if (this.isBrowser()) {
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('token');
    }
  }

}
