import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../../login/Models/user.model';
import { AddBookingResponse } from '../../../../Components/booking/Model/add-booking-response';
import { AuthService } from '../../../login/Services/auth.service';
import { BookingService } from '../../../../Components/booking/Services/booking.service';
import { NotificationService } from '../../../../Services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss',
})
export class HomeDashboardComponent implements OnInit {
  greeting: string = '';
  allbookingsLength: number = 0;
  upcomingbookingsLength: number = 0;
  pastbookingsLength: number = 0;
  cancelledBookingsLength:number=0;
  setGreeting(): void {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good morning!';
    } else if (currentHour < 18) {
      this.greeting = 'Good afternoon!';
    } else {
      this.greeting = 'Good evening!';
    }
  }

  //  user?: User;
  isActive = false;
  // bookings: AddBookingResponse[]=[];
  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.bookingService.countMyBookings().subscribe((count) => {
      console.log(count);
      this.allbookingsLength = count;
    });
    this.bookingService.countUpcomingBookings().subscribe((count) => {
      console.log(count);
      this.upcomingbookingsLength = count;
    });
    this.bookingService.countPastBookings().subscribe((count) => {
      console.log(count);
      this.pastbookingsLength = count;
    });

    this.bookingService.countCancelledBookings().subscribe((count)=>{
      console.log(count);
        this.cancelledBookingsLength = count;
    });
    this.notificationService.currentSideNavState.subscribe((state) => {
      this.isActive = state;
    });
  }
}
