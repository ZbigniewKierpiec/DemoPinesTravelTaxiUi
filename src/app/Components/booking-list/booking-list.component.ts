import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingService } from '../booking/Services/booking.service';
import { Bookings } from '../booking/Model/bookings.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AddBookingRequest } from '../booking/Model/add-booking-request.model';
import { adminBookingList } from './adminBookingList.model';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterModule, CommonModule, NgFor, NgIf],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
})
export class BookingListComponent implements OnInit {
  bookings?: adminBookingList[] = [];
  constructor(private bookingServices: BookingService) {}

  isConfirmed(id: string) {
   


  }

  ngOnInit(): void {
    this.bookingServices.getAllBookings().subscribe({
      next: (response) => {
        console.log(response.$values);
        this.bookings = response.$values;
      },
    });
  }
}
