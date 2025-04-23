import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Trip } from '../Class/trip';
import { Member } from '../Class/member';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {


 // private apiUrl = 'http://localhost:8080/api/trips';
//'http://localhost:8080/api';

  private baseUrl = environment.baseUrls

  constructor(private http: HttpClient) {}

  getTripsByUserId(userId: number): Observable<any> {
     return this.http.get<any[]>(`${this.baseUrl}/trips/${userId}/trips`);
  }

    
  createTrip(payload: { userId: number; tripName: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/trips/create`, payload);
  }

  addMemberToTrip(tripId: number, memberData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/members/add/${tripId}`, memberData,{
      responseType: 'text' as 'json'
    });
  }
  
  getMembersByTripId(tripId: number): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}/trips/members/${tripId}`);
  } 
  

  updateExpense(memberId: number, tripId: number, amount: number, type: string) {
    return this.http.put(
      `${this.baseUrl}/members/expense/${tripId}/${memberId}?amount=${amount}&type=${type}`,{}
    );
  }


  //localhost:8080/api/members/trip/11/total-expense
  getTotalExpenses(tripId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/members/trip/${tripId}/total-expense`);
  }

  //localhost:8080/api/trips/close/9/10
  closeTrip(userId:number,tripId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/trips/close/${userId}/${tripId}`, {},
      {
        responseType: 'text' as 'json'
      }
    );
  }

  //localhost:8080/api/trips/delete/1
  deleteTrip(tripId:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/trips/delete/${tripId}`, { responseType : 'text' as 'json' });
  }
  
  //localhost:8080/api/members/2
  deleteMember(memId:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/members/${memId}`,{ responseType : 'text' as 'json' });
  }

  //localhost:8080/api/trips/2
  getTripBytripId(tripId:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/trips/${tripId}`)
  }
  
}
