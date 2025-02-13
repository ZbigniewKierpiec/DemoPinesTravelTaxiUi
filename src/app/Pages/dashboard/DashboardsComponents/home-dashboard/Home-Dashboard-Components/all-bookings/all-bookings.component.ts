import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { adminBookingList } from '../../../../../../Components/booking-list/adminBookingList.model';
import { BookingService } from '../../../../../../Components/booking/Services/booking.service';
import { RouterLink } from '@angular/router';
import { MyBookings } from '../../../../Model/mybookings.model';
import { AuthService } from '../../../../../login/Services/auth.service';
import { User } from '../../../../../login/Models/user.model';
import {
  AddBookingResponse,
  BookingStatus,
} from '../../../../../../Components/booking/Model/add-booking-response';
import { NotificationService } from '../../../../../../Services/notification.service';
import { Platform } from '@angular/cdk/platform';
import { CardComponent } from "./Mobile/card/card.component";

@Component({
  selector: 'app-all-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],

  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.scss',
})
export class AllBookingsComponent implements OnInit {
  isMobile(): boolean {
    return window.matchMedia('(max-width: 768px)').matches;
  }
  //  user?: User;
  // @Output() bookingsCount = new EventEmitter<number>();
  isActive = false;

  // bookings: AddBookingResponse[]=[];
  bookings: AddBookingResponse[] = [];
  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private notificationService: NotificationService,

  ) {

  }

  //  sendLengthToParent() {
  //   this.bookingsCount.emit(this.bookings.length); // Emit the length of the array
  // }

  // Getter for booking status
  getBookingStatus(status: any): string {
    switch (status) {
      case BookingStatus.Pending:
        return 'Pending';
      case BookingStatus.Confirmed:
        return 'Confirmed';
      case BookingStatus.Cancelled:
        return 'Cancelled';
      case BookingStatus.Completed:
        return 'Completed';
      case BookingStatus.Rejected:
        return 'Rejected';
      case BookingStatus.InProgress:
        return 'In Progress';
      case BookingStatus.AwaitingPayment:
        return 'Awaiting Payment';
      case BookingStatus.Failed:
        return 'Failed';
      default:
        return 'Unknown';
    }
  }

  ngOnInit(): void {
    //  this.authService.user().subscribe({
    //   next: (response) => {
    //     console.log(response?.email);
    //     this.user = response;
    //    },
    //  });

    // this.user = this.authService.getUser();

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

    this.notificationService.currentSideNavState.subscribe((state) => {
      this.isActive = state;
    });


  }
}
