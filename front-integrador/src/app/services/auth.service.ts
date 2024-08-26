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
    user:undefined
  };

  constructor(private http:HttpClient) { }

  //Se agrega la ruta para el login
  loginUser({username,password}:any):Observable<any>{
    return this.http.post<any>(this.url,{username,password});
  }

  //Se agrega el usuario para guardar el usuario en el localStorage
  set user(user:any){
    this._user=user;
    sessionStorage.setItem('login',JSON.stringify(user));
  }

  //Se agrega el usuario para obtener el token del localStorage
  get user(){
    if(this._user.isAuth){
      return this._user;
    } else if(sessionStorage.getItem('login') != null){
      this._user=JSON.parse(sessionStorage.getItem('login')||'');
      return this._user;
    }
    return this._user;
  }

  //Se agrega el método para guardar el token en el localStorage
  set token(token:string){
    this._token=token;
    sessionStorage.setItem('token',token);
  }

  //Se agrega el método para obtener el token del localStorage
  get token(){
    if(this._token != undefined){
      return this._token;
    } else if(sessionStorage.getItem('token') != null){
      this._token=sessionStorage.getItem('token')||'';
      return this._token;
    }
    return this._token!;
  }

  //Se agrega el método para obtener el payload del token
  getPayload(token:string){
    if(token != undefined){
      return JSON.parse(atob(token.split(".")[1]));
    } 
    return null;
  }

  //Se agrega el método para validar si el usuario es administrador
  isAdmin(){
    return this.user.isAdmin;
  }

  //Se agrega el método para validar si el usuario es doctor
  isDoctor(){
    return this.user.isDoctor;
  }

  //Se agrega el método para validar si el usuario está autenticado
  isAuthenticated(){
    return this.user.isAuth;
  }

  //Se agrega el método para cerrar sesión
  logout(){
    this._token=undefined;
    this._user={
      isAuth:false,
      isAdmin:false,
      user:undefined
    };
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }
}
