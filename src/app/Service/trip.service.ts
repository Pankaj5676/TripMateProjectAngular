import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Trip } from '../Class/trip';
import { Member } from '../Class/member';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:8080/api/trips';
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getTripsByUserId(userId: number): Observable<Trip[]> {
     return this.http.get<any[]>(`${this.apiUrl}/${userId}/trips`);
  }

    
  createTrip(payload: { userId: number; tripName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, payload);
  }

  addMemberToTrip(tripId: number, memberData: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/members/add/${tripId}`, memberData);
  }
  
  getMembersByTripId(tripId: number): Observable<Member[]> {
    return this.http.get<Member[]>(`http://localhost:8080/api/trips/members/${tripId}`);
  } 
  

  updateExpense(memberId: number, tripId: number, amount: number, type: string) {
    return this.http.put(
      `http://localhost:8080/api/members/expense/${tripId}/${memberId}?amount=${amount}&type=${type}`,{}
    );
  }


  //localhost:8080/api/members/trip/11/total-expense
  getTotalExpenses(tripId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/api/members/trip/${tripId}/total-expense`);
  }

  //localhost:8080/api/trips/close/9/10
  closeTrip(userId:number,tripId: number): Observable<string> {
    return this.http.post<string>(`http://localhost:8080/api/trips/close/${userId}/${tripId}`, {},
      {
        responseType: 'text' as 'json'
      }
    );
  }
  
}
