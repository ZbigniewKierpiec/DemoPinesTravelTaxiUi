import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBookingRequest } from '../Model/add-booking-request.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Bookings } from '../Model/bookings.model';

import { UpdateBookingRequest } from '../Model/Update-booking.request.model';
import { CookieService } from 'ngx-cookie-service';
import { MyBookings } from '../../../Pages/dashboard/Model/mybookings.model';
import {
  AddBookingResponse,
  BookingStatus,
} from '../Model/add-booking-response';
import { adminBookingList } from '../../booking-list/adminBookingList.model';
import { environment } from '../../../../environments/environment.development';

export interface UserProfile {
  id: string;
  firstName: string;
  surname: string;
  birthday: string;
  gender: string;
  mobile: string;
  email: string;
  landline: string;
  address: string;
  profilepicturepath:string;

}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient, private cookiService: CookieService) {}

  addBooking(model: AddBookingRequest): Observable<void> {
    const token = localStorage.getItem('authToken'); // Retrieve the token from storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add the Authorization header
    });

    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/Reservations/add`,
      model,
      {
        headers: {
          Authorization: this.cookiService.get('Authorization'),
        },
      }
    );
  }

  //////////////////////////Update Profile

  getUserProfile(): Observable<UserProfile> {
    // Make the HTTP GET request
    return this.http.get<UserProfile>(
      `${environment.apiBaseUrl}/api/UserProfile/profile`,
      {
        headers: {
          Authorization: this.cookiService.get('Authorization'),
        },
      }
    );
  }

  updateUserProfile(profileDto: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/UserProfile/profile`,
      profileDto,
      {
        headers: {
          Authorization: this.cookiService.get('Authorization'), // Send token for authentication
        },
      }
    );
  }

  // getAllBookings(): Observable<{$id:string;$values:adminBookingList[]}> {
  //   const token = this.cookirService.get('Authorization');
  //   if (!token) {
  //     throw new Error('User is not authenticated');
  //   }
  //   return this.http.get<{ $id: string; $values:adminBookingList[] }>(`${environment.apiBaseUrl}/api/Reservations/GetAllReservations`

  //   )

  // }

  // getBookingById(id: string): Observable<Bookings> {
  //   return this.http.get<Bookings>(
  //     `${environment.apiBaseUrl}/api/Bookings/${id}`
  //   );
  // }













  updateBooking(
    id: string,
    updateBookingRequest: UpdateBookingRequest
  ): Observable<Bookings> {
    return this.http.put<Bookings>(
      `${environment.apiBaseUrl}/api/Bookings/${id}`,
      updateBookingRequest,
      {
        headers: {
          Authorization: this.cookiService.get('Authorization'),
        },
      }
    );
  }

  // deleteBooking(id: string): Observable<Bookings> {
  //   return this.http.delete<Bookings>(
  //     `${environment.apiBaseUrl}/api/Bookings/${id}`,
  //     {
  //       headers: {
  //         Authorization: this.cookirService.get('Authorization'),
  //       },
  //     }
  //   );
  // }

  /////////////////////////////////////////////

  getMyBookings(): Observable<AddBookingResponse[]> {
    return this.http
      .get<any>(
        `${environment.apiBaseUrl}/api/Reservations/get-my-reservations`,
        {
          headers: {
            Authorization: this.cookiService.get('Authorization'),
          },
        }
      )
      .pipe(
        map((response) => response.$values) // Extract the $values array from the response
      );
  }

  // New function to count bookings
  countMyBookings(): Observable<number> {
    return this.getMyBookings().pipe(
      map((bookings) => bookings.length) // Map the bookings array to its length
    );
  }

  // Fetch upcoming bookings
  getUpcomingBookings(): Observable<AddBookingResponse[]> {
    return this.getMyBookings().pipe(
      map((bookings) =>
        bookings.filter(
          (booking) =>
            new Date(booking.pickupTime) > new Date() && booking.status === 0
        )
      )
    );
  }

  // Fetch count of upcoming bookings
  countUpcomingBookings(): Observable<number> {
    return this.getUpcomingBookings().pipe(
      map(
        (bookings) =>
          bookings.filter(
            (booking) => new Date(booking.pickupTime) > new Date()
          ).length
      ) // Filter and get the length
    );
  }

  // Fetch past bookings
  getPastBookings(): Observable<AddBookingResponse[]> {
    return this.getMyBookings().pipe(
      map((bookings) =>
        bookings.filter((booking) => new Date(booking.pickupTime) < new Date())
      )
    );
  }

  // Count past bookings
  countPastBookings(): Observable<number> {
    return this.getPastBookings().pipe(
      map((bookings) => bookings.length) // Map to the count of past bookings
    );
  }

  // Method to cancel a reservation using GUID
  cancelReservation(reservationId: string): Observable<any> {
    return this.http.put<{ message: string }>(
      `${environment.apiBaseUrl}/api/Reservations/cancel-reservation/${reservationId}`,
      {},

      {
        headers: {
          Authorization: this.cookiService.get('Authorization'),
        },
      }
    );
  }

  getCancelledBookings(): Observable<AddBookingResponse[]> {
    return this.getMyBookings().pipe(
      map(
        (bookings) => bookings.filter((booking) => booking.status === 2) // Filter for Cancelled bookings
      )
    );
  }

  countCancelledBookings(): Observable<number> {
    return this.getCancelledBookings().pipe(
      map((bookings) => bookings.length) // Map to the count of Cancelled bookings
    );
  }

  getAllBookings(): Observable<{ $id: string; $values: adminBookingList[] }> {
    // Make the GET request with the token in the Authorization header
    return this.http.get<{ $id: string; $values: adminBookingList[] }>(
      `${environment.apiBaseUrl}/api/Reservations/GetAllReservations`,
      {
        headers: {
          Authorization: this.cookiService.get('Authorization'), // Include the Authorization header
        },
      }
    );
  }

  getBookingById(id: string): Observable<adminBookingList> {
    return this.http.get<adminBookingList>(
      `${environment.apiBaseUrl}/api/Reservations/${id}`
    );
  }

  deleteBooking(id: string): Observable<Bookings> {
    return this.http.delete<Bookings>(
      `${environment.apiBaseUrl}/api/Reservations/${id}`,
      {
        headers: {
          Authorization: this.cookiService.get('Authorization'),
        },
      }
    );
  }
}
