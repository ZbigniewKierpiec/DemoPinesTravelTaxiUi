import { Component, OnInit } from '@angular/core';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss',
})
export class DriverComponent implements OnInit {
  latitude?: number;
  longitude?: number;
  isOnTheWay = false;

  constructor(private signalrService: SignalrService) {}

  ngOnInit(): void {
    // Start SignalR connection and listen for location updates
    this.signalrService.startConnection().then(() => {
      this.signalrService.receiveLocation().subscribe((data) => {
        this.latitude = data.latitude;
        this.longitude = data.longitude;
      });
    });
  }

  // ✅ Send location only when the driver clicks "On The Way"
  onTheWay(): void {
    this.isOnTheWay = true;
    this.sendLocation();
  }

  // ✅ Fetch driver's location and send it via SignalR
  sendLocation(): void {
    if (!this.isOnTheWay) return; // Only send location when the driver is on the way

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('📡 Sending location:', this.latitude, this.longitude);

          // Send to backend via SignalR
          this.signalrService.sendLocation(this.latitude, this.longitude);

          // Keep sending location every 10 seconds (or adjust as needed)
          setTimeout(() => this.sendLocation(), 10000);
        },
        (error) => {
          console.error('❌ Error getting location:', error);
        },

        // {
        //   enableHighAccuracy: true, // Poproś o możliwie najdokładniejszą lokalizację
        //   timeout: 10000, // Maksymalny czas oczekiwania na lokalizację
        //   maximumAge: 0, // Nie używaj zapisanej lokalizacji
        // }
      );
    } else {
      console.error('❌ Geolocation is not supported.');
    }
  }

  ngOnDestroy(): void {
    this.signalrService.stopConnection();
  }
}
