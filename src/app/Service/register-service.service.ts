import { Injectable } from '@angular/core';
import { User } from '../Class/user';  // Ensure that User class is imported correctly
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  // API endpoint for user registration
  // 'http://localhost:8080/api'
  private apiUrl =environment.baseUrls;  

  constructor(private http: HttpClient) {}

  // Register user by making a POST request to the backend
  registerUser(user: User): Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}/users/register`, user);  // Send the user object as the body of the POST request
  }
}
