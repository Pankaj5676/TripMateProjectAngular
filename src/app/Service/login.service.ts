import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //'http://localhost:8080/api';
  private apiUrl = environment.baseUrls

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }

  sendOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/forgot-password?email=${email}`, {},{
  responseType: 'text' as 'json'
});
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/reset-password?email=${email}&otp=${otp}&newPassword=${newPassword}`, {},{
      responseType: 'text' as 'json'
    });
  }



}