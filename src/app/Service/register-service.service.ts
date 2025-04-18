import { Injectable } from '@angular/core';
import { User } from '../Class/user';  // Ensure that User class is imported correctly
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  // API endpoint for user registration
  private apiUrl = 'http://localhost:8080/api/users/register';  // Make sure to include 'http://'

  constructor(private http: HttpClient) {}

  // Register user by making a POST request to the backend
  registerUser(user: User): Observable<any> {
    console.log(user);
    return this.http.post(this.apiUrl, user);  // Send the user object as the body of the POST request
  }
}
