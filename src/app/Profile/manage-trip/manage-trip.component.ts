import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../Service/trip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Member } from '../../Class/member';

@Component({
  selector: 'app-manage-trip',
  templateUrl: './manage-trip.component.html',
  styleUrl: './manage-trip.component.scss'
})
export class ManageTripComponent implements OnInit {
  memberForm!: FormGroup;
  tripId!: number;
  members: Member[] = [];
  expenseInputs: { [memberId: number]: number } = {};
  totalExpense: number = 0;
  UserId: any = localStorage.getItem('userId');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tripService: TripService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tripId = +this.route.snapshot.paramMap.get('tripId')!;
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      totalSpend: ['']
    });
    this.loadMembers();
    this.getTotalExpense();
  }

  loadMembers() {
    this.tripService.getMembersByTripId(this.tripId).subscribe({
      next: (data) => (this.members = data),
      error: (err) => console.error('Error fetching members:', err),
    });
  }

  updateExpense(memberId: number, type: 'add' | 'subtract') {
    const amount = this.expenseInputs[memberId];

    if (!amount || amount <= 0) {
      alert('Enter a valid amount.');
      return;
    }

    this.tripService.updateExpense(memberId, this.tripId, amount, type).subscribe({
      next: (updatedMember: any) => {
        const index = this.members.findIndex(m => m.id === memberId);
        if (index !== -1) {
          this.members[index].totalSpend = updatedMember.totalSpend;
        }
        this.getTotalExpense();
        this.expenseInputs[memberId] = 0;
      },
      error: (err) => {
        console.error('Failed to update expense:', err);
        alert('Error updating expense');
      }
    });

  }

  getTotalExpense(): any {
    this.tripService.getTotalExpenses(this.tripId)
      .subscribe(
        (data) => {
          this.totalExpense = data;
        },
        (error) => { console.error('Error fetching total expense:', error) }
      );
  }


  closeTrip() {
    if (confirm('After Click on OK trip will close permanently')) {
      this.tripService.closeTrip(this.UserId, this.tripId)
        .subscribe(
          (data: string) => {
            console.log(data);
            this.snackBar.open(data, 'Close', {
              duration: 2000,
              panelClass: ['snackbar-success']
            });
            this.router.navigate(['/dashboard']);
          },
          (error) => {

            console.log(error);
            this.snackBar.open(error.message, 'Close', {
              duration: 2000,
              panelClass: ['snackbar-danger']
            });
          }
        );
    }
  }

  goToAddMembers() {
    this.router.navigate(['addMember/', this.tripId]);
  }

  deleteMember(memId: number) {
    if (confirm("Delete Member Permanently")) {
      this.tripService.deleteMember(memId).subscribe(
        (res) => {
          this.snackBar.open(res, 'Close', {
            duration: 2000,
            panelClass: ['snackbar-danger']
          });

          this.members = this.members.filter(member => member.id !== memId);
          this.getTotalExpense();
          this.loadMembers();
        },
        (err) => {
          this.snackBar.open(err.error, 'Close', {
            duration: 2000,
            panelClass: ['snackbar-danger']
          });
        })

    }
  } 
}