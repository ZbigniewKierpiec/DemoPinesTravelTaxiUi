import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/Services/auth.service';
import { User } from '../login/Models/user.model';
import { Bookings } from '../../Components/booking/Model/bookings.model';
import { BookingService } from '../../Components/booking/Services/booking.service';
import { CommonModule } from '@angular/common';
import { MyBookings } from './Model/mybookings.model';
import { AddBookingRequest } from '../../Components/booking/Model/add-booking-request.model';
import { AddBookingResponse } from '../../Components/booking/Model/add-booking-response';
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { DashboardNotificationsBoxComponent } from "./dashboard-notifications-box/dashboard-notifications-box.component";
import { DashboardSidenavComponent } from "./dashboard-sidenav/dashboard-sidenav.component";
import { NotificationService } from '../../Services/notification.service';
import { RouterOutlet } from '@angular/router';
import { DashboardProfileBoxComponent } from "./dashboard-profile-box/dashboard-profile-box.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardHeaderComponent, DashboardNotificationsBoxComponent, DashboardSidenavComponent, RouterOutlet, DashboardProfileBoxComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // user?: User;
  isActive = false;
  // bookings: AddBookingResponse[]=[];
  // constructor(
  //   private authService: AuthService,
  //   private bookingService: BookingService,
  //    private notificationService: NotificationService

  // ) {}

  // ngOnInit(): void {
  //   this.authService.user().subscribe({
  //     next: (response) => {
  //       console.log(response?.email);
  //       this.user = response;
  //     },
  //   });

  //   this.user = this.authService.getUser();

  //   this.bookingService.getMyBookings().subscribe({
  //     next: (data) => {
  //       // Handle successful response
  //       console.log('Bookings data:', data);
  //       this.bookings = data; // Assign data to your bookings property
  //     },
  //     error: (error) => {
  //       // Handle error response
  //       console.error('Error fetching bookings:', error);
  //     },
  //     complete: () => {
  //       // Optional: Handle completion (when the observable completes)
  //       console.log('Fetch bookings request completed.');
  //     },
  //   });


  //   this.notificationService.currentSideNavState.subscribe((state) => {
  //     this.isActive = state;

  //   });



  // }
}
