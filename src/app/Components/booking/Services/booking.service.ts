import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBookingRequest } from '../Model/add-booking-request.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Bookings } from '../Model/bookings.model';

import { UpdateBookingRequest } from '../Model/Update-booking.request.model';
import { CookieService } from 'ngx-cookie-service';
import { MyBookings } from '../../../Pages/dashboard/Model/mybookings.model';
import { AddBookingResponse } from '../Model/add-booking-response';
import { adminBookingList } from '../../booking-list/adminBookingList.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient, private cookirService: CookieService) {}

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
          Authorization: this.cookirService.get('Authorization'),
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
          Authorization: this.cookirService.get('Authorization'),
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
            Authorization: this.cookirService.get('Authorization'),
          },
        }
      )
      .pipe(
        map((response) => response.$values) // Extract the $values array from the response
      );
  }

  getAllBookings(): Observable<{ $id: string; $values: adminBookingList[] }> {
    // Make the GET request with the token in the Authorization header
    return this.http.get<{ $id: string; $values: adminBookingList[] }>(
      `${environment.apiBaseUrl}/api/Reservations/GetAllReservations`,
      {
        headers: {
          Authorization: this.cookirService.get('Authorization'), // Include the Authorization header
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
          Authorization: this.cookirService.get('Authorization'),
        },
      }
    );
  }

  confirmBooking(orderId: string): Observable<any> {
    const url = `${environment.apiBaseUrl}/api/Reservations/confirm/${orderId}`; // Zakładam, że `baseUrl` to URL API
    const body = { isConfirmed: true };
    return this.http.post(url, body);
  }
}
