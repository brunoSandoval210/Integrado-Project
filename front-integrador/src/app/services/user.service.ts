import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string="http://localhost:8080/integrador/user";

  constructor(private http:HttpClient) { }

  createUser(user:any){
    return this.http.post<any>(this.url,user);
  }
}
