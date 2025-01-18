import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = `${environment.apiUrl}/user`;

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

  getUsers(filters: any): Observable<any> {
    let params = new HttpParams();
    if (filters.page !== undefined) {
      params = params.set('page', filters.page);
    }
    if (filters.size !== undefined) {
      params = params.set('size', filters.size);
    }
    if (filters.roleId !== undefined && filters.roleId !== null) {
      params = params.set('roleId', filters.roleId);
    }
    return this.http.get<any>(`${this.url}/todos`, { params: params });
  }

  updateUser(id:number,user: any) {
    return this.http.put<any>(`${this.url}/${id}`, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`,{ headers: this.getAuthHeaders() });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`,{ headers: this.getAuthHeaders() });
  }

  getSpecializacionsDoctor(): Observable<any> {
    return this.http.get<any>(`${this.url}/especializaciones`,{ headers: this.getAuthHeaders() });
  }

  getUsersFilterByDni(dni: any): Observable<any> {
    return this.http.get<any>(`${this.url}/dni/${dni}`, { headers: this.getAuthHeaders() });
  }
}