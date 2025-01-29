import { Component, OnInit } from '@angular/core';
import { BookingService, UserProfile } from '../../../../../../Components/booking/Services/booking.service';
import { AuthService } from '../../../../../login/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [],


templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit {
  userProfile: UserProfile | null = null;

constructor(private bookingService: BookingService , private authService:AuthService , private cookieService: CookieService){}

  ngOnInit(): void {
this.loadUserProfile()

  }










 // Ładowanie profilu użytkownika
 loadUserProfile(): void {
  console.log('dziala czwartek')
  const token = this.cookieService.get('Bearer');
  console.log(token)
  this.bookingService.getUserProfile().subscribe(
    (profile) => {
      console.log('User Profile:', profile);
      this.userProfile = profile;
    },
    (error) => {
      console.error('Error loading user profile:', error);
    }
  );



}








}
