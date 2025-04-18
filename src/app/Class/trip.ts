import { Member } from "./member";


export class Trip {
  id: number;
  tripName: string;
  closed: boolean;
  members: Member[];

  constructor(id: number, tripName: string, closed: boolean, members: Member[]) {
    this.id = id;
    this.tripName = tripName;
    this.closed = closed;
    this.members = members;
  }
}
