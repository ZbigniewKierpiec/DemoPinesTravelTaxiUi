import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../../login/Models/user.model';
import { AddBookingResponse } from '../../../../Components/booking/Model/add-booking-response';
import { AuthService } from '../../../login/Services/auth.service';
import { BookingService } from '../../../../Components/booking/Services/booking.service';
import { NotificationService } from '../../../../Services/notification.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule , RouterLinkActive],
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
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  // ngOnInit(): void {
  //   this.bookingService.countMyBookings().subscribe((count) => {
  //     console.log(count);
  //     this.allbookingsLength = count;
  //   });
  //   this.bookingService.countUpcomingBookings().subscribe((count) => {
  //     console.log(count);
  //     this.upcomingbookingsLength = count;
  //   });
  //   this.bookingService.countPastBookings().subscribe((count) => {
  //     console.log(count);
  //     this.pastbookingsLength = count;
  //   });

  //   this.bookingService.countCancelledBookings().subscribe((count)=>{
  //     console.log(count);
  //       this.cancelledBookingsLength = count;
  //   });
  //   this.notificationService.currentSideNavState.subscribe((state) => {
  //     this.isActive = state;
  //   });

  //   this.setGreeting();
  // }





  ngOnInit(): void {
    // Manually reload the data when this route is visited.
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        console.log('Refreshing data due to cancellation');
        this.refreshBookingsData();
      }
    });

    // Initial fetch
    this.refreshBookingsData();

    // Subscribe to the current side nav state
    this.notificationService.currentSideNavState.subscribe((state) => {
      this.isActive = state;
    });

    // Set greeting based on time
    this.setGreeting();
  }

  refreshBookingsData() {
    // Fetch the latest booking counts
    forkJoin({
      allBookings: this.bookingService.countMyBookings(),
      upcomingBookings: this.bookingService.countUpcomingBookings(),
      pastBookings: this.bookingService.countPastBookings(),
      cancelledBookings: this.bookingService.countCancelledBookings()
    }).subscribe({
      next: (response) => {
        console.log('Booking counts received:', response);
        this.allbookingsLength = response.allBookings || 0;
        this.upcomingbookingsLength = response.upcomingBookings || 0;
        this.pastbookingsLength = response.pastBookings || 0;
        this.cancelledBookingsLength = response.cancelledBookings || 0;
      },
      error: (error) => {
        console.error('Error fetching booking counts:', error);
      }
    });
  }













}
