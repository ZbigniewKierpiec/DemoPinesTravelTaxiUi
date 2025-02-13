import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { HomeDashboardNotyficationComponent } from '../../../home-dashboard-notyfication/home-dashboard-notyfication.component';
import { BookingService } from '../../../../../../../../Components/booking/Services/booking.service';
import { NotificationService } from '../../../../../../../../Services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-upcoming',
  standalone: true,
  imports: [CommonModule, HomeDashboardNotyficationComponent],
  templateUrl: './card-upcoming.component.html',
  styleUrl: './card-upcoming.component.scss',
})
export class CardUpcomingComponent {
  @Input() item: any;

  @ViewChild(HomeDashboardNotyficationComponent)
  childComponent!: HomeDashboardNotyficationComponent;

  constructor(
    private bookingService: BookingService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  triggerNotificationFromParent(message: string) {
    this.childComponent.addNotification(message);
  }

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
            this.router
              .navigateByUrl('/bracknellTaxis/user/dashboard/home', {
                skipLocationChange: true,
              })
              .then(() => {
                // Optionally, navigate to the same path to force a reload
                this.router.navigate(['/bracknellTaxis/user/dashboard/home'], {
                  queryParams: { refresh: new Date().getTime() },
                });
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
}
