import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddBookingResponse } from '../../../../../../Components/booking/Model/add-booking-response';
import { AuthService } from '../../../../../login/Services/auth.service';
import { BookingService } from '../../../../../../Components/booking/Services/booking.service';
import { NotificationService } from '../../../../../../Services/notification.service';

@Component({
  selector: 'app-upcoming-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-bookings.component.html',
  styleUrl: './upcoming-bookings.component.scss'
})
export class UpcomingBookingsComponent {

//  user?: User;
// @Output() bookingsCount = new EventEmitter<number>();
 isActive = false;

// bookings: AddBookingResponse[]=[];
bookings: AddBookingResponse[]=[];
 constructor(
   private authService: AuthService,
  private bookingService: BookingService,
   private notificationService: NotificationService

 ) {}



//  sendLengthToParent() {
//   this.bookingsCount.emit(this.bookings.length); // Emit the length of the array
// }





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
