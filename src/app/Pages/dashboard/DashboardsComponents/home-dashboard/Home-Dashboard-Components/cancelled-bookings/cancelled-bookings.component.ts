import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../../../../login/Services/auth.service';
import { BookingService } from '../../../../../../Components/booking/Services/booking.service';
import { NotificationService } from '../../../../../../Services/notification.service';
import {
  AddBookingResponse,
  BookingStatus,
} from '../../../../../../Components/booking/Model/add-booking-response';

import { HomeDashboardNotyficationComponent } from '../home-dashboard-notyfication/home-dashboard-notyfication.component';

@Component({
  selector: 'app-cancelled-bookings',
  standalone: true,
  imports: [CommonModule,HomeDashboardNotyficationComponent],
  templateUrl: './cancelled-bookings.component.html',
  styleUrl: './cancelled-bookings.component.scss',
})
export class CancelledBookingsComponent {
  @ViewChild(HomeDashboardNotyficationComponent)
  childComponent!: HomeDashboardNotyficationComponent;
  triggerNotificationFromParent(message: string) {
    this.childComponent.addNotification(message);

  }

  bookings: AddBookingResponse[] = [];
  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private notificationService: NotificationService
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

  ngOnInit(): void {
    //  this.authService.user().subscribe({
    //   next: (response) => {
    //     console.log(response?.email);
    //     this.user = response;
    //    },
    //  });

    // this.user = this.authService.getUser();

    this.bookingService.getCancelledBookings().subscribe({
      next: (data) => {
        // Handle successful response
        console.log('Bookings data:', data);
        this.bookings = data; // Assign data to your bookings property
        // this.sendLengthToParent();
        this.triggerNotificationFromParent(
          'Please select a future date. Past dates are not allowed.'
        );
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

    //  this.notificationService.currentSideNavState.subscribe((state) => {
    //     this.isActive = state;

    //  });
  }
}
