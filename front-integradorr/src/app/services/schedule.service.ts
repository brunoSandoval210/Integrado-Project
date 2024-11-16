import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private url: string = `${environment.apiUrl}/schedule`;

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getSchedules(filters: any) {
    let params = new HttpParams();
    if (filters.page !== undefined) {
      params = params.set('page', filters.page);
    }
    if (filters.size !== undefined) {
      params = params.set('size', filters.size);
    }
    if (filters.today !== undefined) {
      params = params.set('today', filters.today);
    }
    if (filters.filterDay !== undefined) {
      params = params.set('filterDay', filters.filterDay);
    }
    if (filters.idUser !== undefined) {
      params = params.set('idUser', filters.idUser);
    }
    if (filters.status !== undefined) {
      params = params.set('status', filters.status);
    }
    if (filters.statusSchedule !== undefined) {
      params = params.set('statusSchedule', filters.statusSchedule);
    }

    return this.http.get<any>(`${this.url}/todos`, { headers: this.getAuthHeaders(), params: params });
  }
  createSchedule(schedule: any) {
    return this.http.post<any>(this.url, schedule, { headers: this.getAuthHeaders() });
  }

  updateSchedule(id: number, schedule: any) {
    return this.http.put<any>(`${this.url}/${id}`, schedule, { headers: this.getAuthHeaders() });
  }

  deleteSchedule(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
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
