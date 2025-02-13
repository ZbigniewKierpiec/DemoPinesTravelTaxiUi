import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AddBookingResponse } from '../../../../../../Components/booking/Model/add-booking-response';
import { AuthService } from '../../../../../login/Services/auth.service';
import { BookingService } from '../../../../../../Components/booking/Services/booking.service';
import { NotificationService } from '../../../../../../Services/notification.service';
import { Router } from '@angular/router';
import { HomeDashboardNotyficationComponent } from '../home-dashboard-notyfication/home-dashboard-notyfication.component';
import { CardUpcomingComponent } from "./Mobile/card-upcoming/card-upcoming.component";
export enum BookingStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3,
  Rejected = 4,
  InProgress = 5,
  AwaitingPayment = 6,
  Failed = 7,
}
@Component({
  selector: 'app-upcoming-bookings',
  standalone: true,
  imports: [CommonModule, HomeDashboardNotyficationComponent, CardUpcomingComponent],
  templateUrl: './upcoming-bookings.component.html',
  styleUrl: './upcoming-bookings.component.scss',
})
export class UpcomingBookingsComponent {
  isMobile(): boolean {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  //  user?: User;
  // @Output() bookingsCount = new EventEmitter<number>();

  @ViewChild(HomeDashboardNotyficationComponent)
  childComponent!: HomeDashboardNotyficationComponent;
  triggerNotificationFromParent(message: string) {
    this.childComponent.addNotification(message);

  }



  isActive = false;

  // bookings: AddBookingResponse[]=[];
  bookings: AddBookingResponse[] = [];
  bookingStatusEnum = BookingStatus;
  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

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

  // cancellBooking(bookingId: string) {
  //   console.log(bookingId);
  //   this.bookingService.cancelReservation(bookingId).subscribe(
  //     (response) => {
  //       // Handle success response (update UI, show success message)
  //       console.log('Booking cancelled successfully'+ response);
  //       // Update local status to 'Cancelled'

  //     },
  //     (error) => {
  //       // Handle error response
  //       console.error('Cancellation failed:', error);
  //     }
  //   );
  // }

  cancellBooking(bookingId: string) {
    console.log('Booking ID:', bookingId);
    this.triggerNotificationFromParent(
      'Your booking was canceled successfully.'
    );

    this.bookingService.cancelReservation(bookingId).subscribe(
      (response: { message: string }) => {


        if (response && response.message) {
          console.log('Booking cancelled successfully:', response.message);

        //  alert(response.message); // Display the success message

          // Navigate to the dashboard/home component


// After successful cancellation, delay navigation by a few seconds
setTimeout(() => {
  this.router.navigateByUrl('/bracknellTaxis/user/dashboard/home', { skipLocationChange: true }).then(() => {
    // Optionally, navigate to the same path to force a reload
    this.router.navigate(['/bracknellTaxis/user/dashboard/home'], { queryParams: { refresh: new Date().getTime() } });
  });
}, 3000); // Delay in milliseconds (3000ms = 3 seconds)








        } else {
          console.error(
            'Response does not contain a Message property:',
            response
          );
          alert('Something went wrong. Please try again.');
        }
      },
      (error) => {
        console.error('Cancellation failed:', error.message);
        alert('Failed to cancel the booking. Please try again.');
      }
    );
  }

  ngOnInit(): void {
    //  this.authService.user().subscribe({
    //   next: (response) => {
    //     console.log(response?.email);
    //     this.user = response;
    //    },
    //  });

    // this.user = this.authService.getUser();

    this.bookingService.getUpcomingBookings().subscribe({
      next: (data) => {
        // Handle successful response
        console.log('Bookings data:', data);
        this.bookings = data; // Assign data to your bookings property
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
