import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  updateUser(user: any) {
    return this.http.put<any>(`${this.url}/${this.getUserId()}`, user, { headers: this.getAuthHeaders() });
  }
}