import { Routes } from "@angular/router";
import { ProfileComponent } from "../Components/profile/profile.component";
import { SettingsComponent } from "../Components/settings/settings.component";

export const DashboardProfileRoutes: Routes = [
  {
    path: 'profile',
    component:ProfileComponent ,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },

];
