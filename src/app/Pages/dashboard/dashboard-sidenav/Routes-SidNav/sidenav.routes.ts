import { Routes } from '@angular/router';
import { HomeDashboardComponent } from '../../DashboardsComponents/home-dashboard/home-dashboard.component';
import { BookinglistDashboardComponent } from '../../DashboardsComponents/bookinglist-dashboard/bookinglist-dashboard.component';
export const sidenavRoutes: Routes = [
  {
    path: 'home',
    component: HomeDashboardComponent,
  },
  {
    path: 'booking-list',
    component: BookinglistDashboardComponent,
  },
];
