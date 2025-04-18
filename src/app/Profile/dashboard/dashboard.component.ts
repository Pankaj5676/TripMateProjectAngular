import { Component, OnInit } from '@angular/core';
import { Trip } from '../../Class/trip';
import { TripService } from '../../Service/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  trips: Trip[] = [];
   userName:any= localStorage.getItem('userName');
    

  constructor(private tripService: TripService,private router:Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    // const userName= localStorage.getItem('userName');
    if (userId) {
      this.tripService.getTripsByUserId(+userId).subscribe({
        next: (data) => {
          this.trips = data;
        },
        error: (err) => {
          console.error('Error fetching trips:', err);
        }
      });
    }
  }


  logout(){
      const confirmLogout = window.confirm('Are you sure you want to logout?');
      
      if (confirmLogout) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
  }


  updateTrip(id:number){

    this.router.navigate(['manageTrip',id]);
  }
  viewTrip(id:number){
    
  }


}