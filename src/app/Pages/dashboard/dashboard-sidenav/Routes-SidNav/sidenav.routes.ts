import { Routes } from '@angular/router';
import { HomeDashboardComponent } from '../../DashboardsComponents/home-dashboard/home-dashboard.component';
import { BookinglistDashboardComponent } from '../../DashboardsComponents/bookinglist-dashboard/bookinglist-dashboard.component';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { DashboardHomeComponentsRoutes } from '../../DashboardsComponents/Dashboardcomponentsroutes/dashboardhomerouts';
import { ProfileComponent } from '../../dashboard-profile-box/Components/profile/profile.component';
import { SettingsComponent } from '../../dashboard-profile-box/Components/settings/settings.component';
import { DashboardProfileRoutes } from '../../dashboard-profile-box/Dashboard-profilebox-routes/profilebox.routes';
export const sidenavRoutes: Routes = [
   {
     path: 'home',
     component: HomeDashboardComponent,
     children: DashboardHomeComponentsRoutes,

   },
  {
     path: 'profile',
     component:ProfileComponent,
   }
//    {
//      path: 'home',
//      component: HomeDashboardComponent,
//      children: [...DashboardHomeComponentsRoutes, ...DashboardProfileRoutes],
//    },
//    {
//      path: 'booking-list',
//      component:ProfileComponent,
//  },
];
