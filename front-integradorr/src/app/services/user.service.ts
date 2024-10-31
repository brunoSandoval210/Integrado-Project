import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://localhost:8080/user";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserId() {
    return this.authService.getUserId();
  }

  getToken() {
    return this.authService.token;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createUser(user: any) {
    return this.http.post<any>(this.url, user);
  }

  getUsers(filers:any){
    let params = new HttpParams();
    if (filers.page !== undefined) {
      params = params.set('page', filers.page);
    }
    if (filers.size !== undefined) {
      params = params.set('size', filers.size);
    }
    if (filers.roleId !== undefined) {
      params = params.set('roleId', filers.roleId);
    }
    return this.http.get<any>(`${this.url}/todos`, { headers: this.getAuthHeaders(), params: params });
  }

  updateUser(user: any) {
    return this.http.put<any>(`${this.url}/${this.getUserId()}`, user, { headers: this.getAuthHeaders() });
  }
}