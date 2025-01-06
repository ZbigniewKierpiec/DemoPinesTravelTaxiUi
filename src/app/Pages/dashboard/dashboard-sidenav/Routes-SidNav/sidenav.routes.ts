import { Routes } from '@angular/router';
import { HomeDashboardComponent } from '../../DashboardsComponents/home-dashboard/home-dashboard.component';
import { BookinglistDashboardComponent } from '../../DashboardsComponents/bookinglist-dashboard/bookinglist-dashboard.component';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { DashboardHomeComponentsRoutes } from '../../DashboardsComponents/Dashboardcomponentsroutes/dashboardhomerouts';
export const sidenavRoutes: Routes = [
  {
    path: 'home',
    component: HomeDashboardComponent,
    children: DashboardHomeComponentsRoutes,
  },
  {
    path: 'booking-list',
    component: BookinglistDashboardComponent,
  },
];
