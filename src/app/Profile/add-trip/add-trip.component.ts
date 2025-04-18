import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../Service/trip.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss'
})
export class AddTripComponent {
  tripForm!: FormGroup;

  constructor(
     private fb: FormBuilder,
     private http: HttpClient,
     private tripService:TripService,
     private router:Router,
     private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tripForm = this.fb.group({
      tripName: ['', Validators.required]
    });
  }

  createTrip(): void {
    if (this.tripForm.valid) {
      const userId = localStorage.getItem('userId');

      const payload = {
        userId: Number(userId),
        tripName: this.tripForm.value.tripName
      };

      this.tripService.createTrip(payload).subscribe({
        next: (res) => {
          console.log('Trip created:', res);

          this.snackBar.open('Trip created successfully!', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/dashboard']);

        },
        error: (error) => {
          console.error('Error creating trip:', error);
          alert('Failed to create trip.');
        }
      });
    }
  }
}
