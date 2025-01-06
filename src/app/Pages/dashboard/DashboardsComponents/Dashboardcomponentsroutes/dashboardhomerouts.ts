import { Routes } from '@angular/router';
import { AllBookingsComponent } from '../home-dashboard/Home-Dashboard-Components/all-bookings/all-bookings.component';
import { CancelledBookingsComponent } from '../home-dashboard/Home-Dashboard-Components/cancelled-bookings/cancelled-bookings.component';
import { PastBookingsComponent } from '../home-dashboard/Home-Dashboard-Components/past-bookings/past-bookings.component';
import { UpcomingBookingsComponent } from '../home-dashboard/Home-Dashboard-Components/upcoming-bookings/upcoming-bookings.component';

export const DashboardHomeComponentsRoutes: Routes = [
  {
    path: 'all',
    component: AllBookingsComponent,
  },
  {
    path: 'upcoming',
    component: UpcomingBookingsComponent,
  },
  {
    path: 'past',
    component: PastBookingsComponent,
  },
  {
    path: 'cancelled',
    component: CancelledBookingsComponent,
  },
];
