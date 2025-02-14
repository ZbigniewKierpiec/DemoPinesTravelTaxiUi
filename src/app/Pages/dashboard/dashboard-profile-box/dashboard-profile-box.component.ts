import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../../Services/notification.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileImageService } from './Components/profile/profile-image.service';
import { BookingService } from '../../../Components/booking/Services/booking.service';
export interface Profile {
  [x: string]: any;
  icon: string;
  name: string;
  url: string;
}
@Component({
  selector: 'app-dashboard-profile-box',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-profile-box.component.html',
  styleUrl: './dashboard-profile-box.component.scss',
})
export class DashboardProfileBoxComponent implements OnInit, OnDestroy {
  constructor(private notificationService: NotificationService , private bookingService: BookingService ) {}
  private profileStateSubscription: Subscription | undefined;
  isActive: boolean = false;
  name?:string='';
  surname:string='';
  profile: Profile[] = [

    {
      icon: 'fas fa-home',
      name: 'home',
      url: 'home',
    },
    {
      icon: 'fa-regular fa-user',
      name: 'profile',
      url: 'profile',
    },

    {
      icon: 'fa-solid fa-headphones-simple',
      name: 'support',
      url: '',
    },
    {
      icon: 'fa-solid fa-power-off',
      name: 'log out',
      url: '',
    },
  ];

  close() {
    this.notificationService.toggleProfileState();
  }

  ngOnInit(): void {
    this.profileStateSubscription =
      this.notificationService.currentProfileState.subscribe((state) => {
        this.isActive = state;
      });



      this.bookingService.getUserProfile().subscribe(
        (profile) => {
          console.log('User Profile:', profile);
          this.name = profile.firstName;
          this.surname = profile.surname;
        },
        (error) => {
          console.error('Error loading user profile:', error);
        }
      );



  }

  ngOnDestroy(): void {
    if (this.profileStateSubscription) {
      this.profileStateSubscription.unsubscribe();
    }
  }
}
