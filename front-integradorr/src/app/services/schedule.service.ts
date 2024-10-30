import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private url: string = "http://localhost:8080/schedule";

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getSchedules() {
    return this.http.get<any>(this.url,{headers: this.getAuthHeaders()});
  }

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
}
