import { CommonModule, NgFor } from '@angular/common';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { AddBookingResponse } from '../../../../../../../Components/booking/Model/add-booking-response';
import { AuthService } from '../../../../../../login/Services/auth.service';
import { BookingService } from '../../../../../../../Components/booking/Services/booking.service';
import { NotificationService } from '../../../../../../../Services/notification.service';
import { CardComponent } from '../Mobile/card/card.component';



@Component({
  selector: 'app-dashbpard-test',
  standalone: true,
  imports: [CommonModule, NgFor, CardComponent],
  templateUrl: './dashbpard-test.component.html',
  styleUrl: './dashbpard-test.component.scss',

})
export class DashbpardTestComponent implements OnInit {

  bookings: AddBookingResponse[] = [];
  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        // Handle successful response
        console.log('Bookings data:', data);
        this.bookings = data; // Assign data to your bookings property
        // this.sendLengthToParent();
      },
      error: (error) => {
        // Handle error response
        console.error('Error fetching bookings:', error);
      },
      complete: () => {
        // Optional: Handle completion (when the observable completes)
        console.log('Fetch bookings request completed.');
      },
    });
  }

}
