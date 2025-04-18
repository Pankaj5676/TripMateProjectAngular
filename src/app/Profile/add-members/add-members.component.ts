import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../Service/trip.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss'
})
export class AddMembersComponent {

  memberForm!: FormGroup;
    tripId!: number;
  
    constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private tripService: TripService,
      private snackBar: MatSnackBar,
      private router:Router
    ) {}
  
    ngOnInit(): void {
      this.tripId = +this.route.snapshot.paramMap.get('tripId')!;
      console.log(this.tripId);
      this.memberForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        totalSpend: ['']
      });

    }

    goback(){
      this.router.navigate(['/manageTrip/',this.tripId]);
    }



  addMember() {
    if (this.memberForm.valid) {

      this.tripService.addMemberToTrip(this.tripId, this.memberForm.value).subscribe(
        (res:any) => {
          this.snackBar.open("Member Added ...!", 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'] 
          });
          this.memberForm.reset();
          this.router.navigate(['/manageTrip/',this.tripId]);
        },
        (err:any) =>{
          this.snackBar.open("Error while creating member", 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'] 
          });
         }
      );
    }
  }
}
