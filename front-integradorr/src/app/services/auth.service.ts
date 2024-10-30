import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "http://localhost:8080/auth/login";
  private _token!: string | undefined;
  private _user: any = {
    role: '',
    id: 0,
    username: '',
    isAuth: false,
  };

  constructor(private http: HttpClient) { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  loginUser({ username, password }: any): Observable<any> {
    return this.http.post<any>(this.url, { username, password });
  }

  set user(user: any) {
    this._user = user;
    this._user.isAuth = true; // Asegúrate de marcar el usuario como autenticado
    if (this.isBrowser()) {
      sessionStorage.setItem('login', JSON.stringify(user));
    }
  }

  get user() {
    if (this._user.isAuth) {
      return this._user;
    } else if (this.isBrowser() && sessionStorage.getItem('login') != null) {
      this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
      return this._user;
    }
    return this._user;
  }

  set token(token: string) {
    this._token = token;
    if (this.isBrowser()) {
      sessionStorage.setItem('token', token);
    }
    // Extraer información del usuario del token
    const payload = this.getPayload(token);
    if (payload) {
      this.user = {
        username: payload.sub,
        role: payload.authorities[0], // Asumiendo que solo hay un rol
        isAuth: true
      };
      // Imprimir la duración del token
      const expirationDate = new Date(payload.exp * 1000);
      console.log(`Token expires at: ${expirationDate}`);
    }
  }

  get token() {
    if (this._token !== undefined) {
      return this._token;
    } else if (this.isBrowser() && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token!;
  }

  getUserId() {
    return this.user.id;
  }

  getPayload(token: string) {
    if (token !== undefined) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.token;
    if (token) {
      const payload = this.getPayload(token);
      if (payload) {
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp > currentTime;
      }
    }
    return false;
  }

  hasRole(role: string): boolean {
    const payload = this.getPayload(this.token);
    if (payload && payload.authorities) {
      return payload.authorities.includes(role); // Comprueba si el rol está en las autoridades
    }
    return false;
  }
  
  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN'); // Usa el rol adecuado
  }
  
  isDoctor(): boolean {
    return this.hasRole('ROLE_DOCTOR'); // Usa el rol adecuado
  }
  
  isPatient(): boolean {
    return this.hasRole('ROLE_USER'); // Usa el rol adecuado
  }

  logout() {
    this._token = undefined;
    this._user = {
      isAuth: false,
      role: '',
      id: 0,
      username: ''
    };
    if (this.isBrowser()) {
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('token');
    }
  }
}