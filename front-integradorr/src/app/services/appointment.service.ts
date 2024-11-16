import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url: string = `${environment.apiUrl}/appointments`; // Usar la URL del entorno

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createAppointment(appointment: any) {
    return this.http.post<any>(this.url, appointment, { headers: this.getAuthHeaders() });
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
