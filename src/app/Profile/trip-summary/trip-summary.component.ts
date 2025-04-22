import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../Service/trip.service';

@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.component.html',
  styleUrl: './trip-summary.component.scss'
})
export class TripSummaryComponent implements OnInit{

  showCard: boolean = true;
  tripId!: number;
  userId!:number;
  tripName: string = '';
  isClosed: boolean = false;

  totalExpense: number = 0;
  contributionPerPerson: number = 0;

  members: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getTripInfo(); 
  }

  getTripInfo(){
    this.tripId = Number(this.route.snapshot.paramMap.get('tripId'));

    console.log(this.userId);

    this.tripService.getTripBytripId(this.tripId).subscribe((trip) => {
      this.tripName = trip.tripName;
      this.isClosed = trip.closed;
    });

    this.tripService.getTotalExpenses(this.tripId).subscribe((total) => {
      this.totalExpense = total;
      this.tripService.getMembersByTripId(this.tripId).subscribe((members) => {
        this.members = members;

        if (members.length > 0) {
          this.contributionPerPerson = Math.floor(this.totalExpense / members.length);

          this.members = this.members.map(member => {
            const diff = member.totalSpend - this.contributionPerPerson;
            return {
              ...member,
              status: diff === 0 ? 'Settled' : (diff > 0 ? `Gets ₹${diff}` : `Pays ₹${Math.abs(diff)}`)
            };
          });
        }
      });
    });
  }

  closeCard() {
    this.showCard = false;
    this.router.navigate(['/dashboard']);
  }
}
