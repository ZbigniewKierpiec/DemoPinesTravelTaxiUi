import { Data } from 'ws';

export interface Bookings {
  id: string;
  PickupLocation: string;
  via: string;
  DropoffLocation: string;
  PickupTime: string;
  Passengers: string;
  Louggages: string;
  Greet: boolean;
  Price: number;
  CarType: string;
  CarImage: string;
  Name: string;
  PhoneNumber: string;
  Email: string;
  DriverInstruction: string;
  BookedAt: string;
}
