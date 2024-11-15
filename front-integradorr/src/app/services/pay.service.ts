import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  private baseUrl: string = "http://localhost:8080/payment";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createPaymentIntent(amount: number, currency: string, description: string): Observable<any> {
    const body = {
      amount: amount,
      currency: currency,
      description: description
    };
    return this.http.post(`${this.baseUrl}/paymentintent`, body, { headers: this.getAuthHeaders() });
  }

  confirmPaymentIntent(paymentIntentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirm/${paymentIntentId}`, { headers: this.getAuthHeaders() });
  }

  cancelPaymentIntent(paymentIntentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/cancel/${paymentIntentId}`,  { headers: this.getAuthHeaders() });
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