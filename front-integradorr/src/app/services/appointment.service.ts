import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

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

  getAppointmentsWithFilters(filters:any){
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('size', filters.size.toString());

    if (filters.idUser !== undefined && filters.idUser !== null) {
      params = params.set('idUser', filters.idUser.toString());
    }
    if (status !== undefined && status !== null) {
      params = params.set('status', status.toString());
    }
    if (filters.statusAppointment !== undefined && filters.statusAppointment !== null) {
      params = params.set('statusAppointment', filters.statusAppointment);
    }

    return this.http.get<any>(`${this.url}/confiltros`, { headers: this.getAuthHeaders(), params });
  }


  getAppointmentsForDay(filters:any){
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('size', filters.size.toString());

    if (filters.idUser !== undefined && filters.idUser !== null) {
      params = params.set('idUser', filters.idUser.toString());
    }
    if (filters.date !== undefined && filters.date !== null) {
      params = params.set('date', filters.date);
    }

    return this.http.get<any>(`${this.url}/AppointmentsForDay`, { headers: this.getAuthHeaders(), params });
  }

  rescheduleAppointment(rescheduleRequest: any): Observable<any> {
    return this.http.post<any>(`${this.url}/reprogramar`, rescheduleRequest, { headers: this.getAuthHeaders() });
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
