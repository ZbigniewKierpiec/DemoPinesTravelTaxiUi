import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingService } from '../../booking/Services/booking.service';
import { Bookings } from '../../booking/Model/bookings.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateBookingRequest } from '../../booking/Model/Update-booking.request.model';
import { adminBookingList } from '../adminBookingList.model';

@Component({
  selector: 'app-edit-bookings-list',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './edit-bookings-list.component.html',
  styleUrl: './edit-bookings-list.component.scss',
})
export class EditBookingsListComponent implements OnInit, OnDestroy {
  paramsSubscription?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingsService: BookingService
  ) {}

  id: string | null = null;
  booking?: adminBookingList;

  onFormSubmit(): void {
    console.log(this.booking);

    const updateBookingRequest: UpdateBookingRequest = {
      Name: this.booking?.name ?? '',
      Email: this.booking?.email ?? '',
      PhoneNumber: this.booking?.phoneNumber ?? '',
      PickUpDate: this.booking?.pickupTime ?? '',
      Pickup: this.booking?.pickupLocation ?? '',
      Via: this.booking?.via ?? '',
      DropOff: this.booking?.dropoffLocation ?? '',
      Passengers: this.booking?.passengers ?? '',
      Louggages: this.booking?.louggages ?? '',
      CarType: this.booking?.carType ?? '',
      CarImage: this.booking?.carImage ?? '',
      Greet: this.booking?.greet ?? false,
      DriverInstruction: this.booking?.driverInstruction ?? '',
      Price: this.booking?.price ?? 0,
      
    };
    if (this.id) {
      this.bookingsService
        .updateBooking(this.id, updateBookingRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/bracknellTaxis/booking/admin/list');
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.bookingsService.deleteBooking(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/bracknellTaxis/booking/admin/list');
        },
      });
    }
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.bookingsService.getBookingById(this.id).subscribe({
            next: (response) => {
              console.log(response);
              this.booking = response;
            },
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}
