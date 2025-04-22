import { Component, OnInit } from '@angular/core';
import { Trip } from '../../Class/trip';
import { TripService } from '../../Service/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  trips: Trip[] = [];
  userId: any = localStorage.getItem('userId');
  userName: any = localStorage.getItem('userName');

  members: any[] = [];


  constructor(private tripService: TripService, private router: Router, private snackBar: MatSnackBar,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.gettingAllTrips();


  }

  gettingAllTrips() {
    if (this.userId) {
      this.tripService.getTripsByUserId(this.userId).subscribe({
        next: (data) => {
          this.trips = data;
        },
        error: (err) => {
          console.error('Error fetching trips:', err);
        }
      });
    }
  }


  logout() {
    const confirmLogout = window.confirm('Are you sure you want to logout?');

    if (confirmLogout) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }


  updateTrip(id: number) {
    this.router.navigate(['manageTrip', id]);
  }

  viewTrip(id: number) {
    this.router.navigate(['tripSummary', id]);
  }

  deleteTrip(id: number) {
    if (confirm("trip will delete permanently along with member data...!")) {
      this.tripService.deleteTrip(id).subscribe(
        (res) => {
          console.log(res);
          this.snackBar.open(res, 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success']
          });

          this.gettingAllTrips();
        },
        (err) => {
          console.log(err);
          this.snackBar.open(err.error, 'Close', {
            duration: 2000,
            panelClass: ['snackbar-danger']
          });
        }
      )
    }

  }

}