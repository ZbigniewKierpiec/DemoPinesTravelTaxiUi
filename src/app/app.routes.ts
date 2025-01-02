import { Routes } from '@angular/router';
import { AirportTransferComponentComponent } from './Pages/airport-transfer-component/airport-transfer-component.component';
import { MainComponent } from './Pages/main/main.component';
import { BookingComponent } from './Components/booking/booking.component';
import { BookingDetailComponent } from './Components/booking/booking-detail/booking-detail.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { BookingListComponent } from './Components/booking-list/booking-list.component';
import { EditBookingsListComponent } from './Components/booking-list/edit-bookings-list/edit-bookings-list.component';
import { authGuard } from './Pages/login/guards/auth.guard';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'bracknellTaxis/main', pathMatch: 'full' },
//   { path: 'bracknellTaxis/home', component: MainComponent },
//   {
//     path: 'bracknellTaxis/airportTransfer',
//     component: AirportTransferComponentComponent,
//   },
// ];
export const routes: Routes = [
  { path: '', redirectTo: 'bracknellTaxis/home', pathMatch: 'full' },
  {
    path: 'bracknellTaxis/home',
    component: MainComponent,
    data: { animate: false },
  },
  {
    path: 'bracknellTaxis/airportTransfer',
    component: AirportTransferComponentComponent,
    data: { animate: false },
  },
  {
    path: 'bracknellTaxis/login',
    component: LoginComponent,
  },

  {
    path: 'bracknellTaxis/signup',
    component: SignupComponent,
  },

  {
    path: 'bracknellTaxis/booking',
    component: BookingComponent,
  },

  {
    path: 'bracknellTaxis/booking/admin/list',
    component: BookingListComponent,
    canActivate: [authGuard],
  },

  {
    path: 'bracknellTaxis/booking/admin/list/:id',
    component: EditBookingsListComponent,
    canActivate: [authGuard],
  },
  {
    path:'bracknellTaxis/user/dashboard',
    component:DashboardComponent
  }
];
