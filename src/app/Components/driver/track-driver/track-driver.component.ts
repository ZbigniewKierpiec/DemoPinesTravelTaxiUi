import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SignalrService } from '../signalr.service';
import {
  GoogleMap,
  GoogleMapsModule,
  MapDirectionsService,
} from '@angular/google-maps';
import { MapDisplayComponent } from '../../booking/map-display/map-display.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-driver',
  standalone: true,
  imports: [MapDisplayComponent, GoogleMapsModule, CommonModule],
  templateUrl: './track-driver.component.html',
  styleUrl: './track-driver.component.scss',
})
export class TrackDriverComponent implements OnInit, OnDestroy {
  latitude: number = 0; // Default latitude set to 0
  longitude: number = 0; // Default longitude set to 0
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Default to (0, 0)
  zoom: number = 14; // Default zoom level
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Default marker position at (0, 0)

  mapWidth: string = '100%'; // Default map width
  mapHeight: string = '100%'; // Default map height
  directionResult: google.maps.DirectionsResult | undefined;

  googleMap: google.maps.Map | undefined; // Reference to your Google Map instance
  carIcon: google.maps.Icon = {
    url: '/assets/car-icon-png-4259.png',
    scaledSize: new google.maps.Size(62, 62), // Rozmiar ikony (72x72 px)
    origin: new google.maps.Point(0, 0), // Punkt początkowy obrazu
    anchor: new google.maps.Point(26, 26), // Połowa szerokości i wysokości (72/2 = 36)
  };

  constructor(
    private signalrService: SignalrService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // 🔥 Pobierz ostatnią lokalizację z localStorage
    const savedLocation = localStorage.getItem('lastLocation');
    if (savedLocation) {
      const { latitude, longitude } = JSON.parse(savedLocation);
      this.latitude = latitude;
      this.longitude = longitude;
      this.center = { lat: latitude, lng: longitude };
      this.markerPosition = this.center;
    }

    // Start the SignalR connection
    this.signalrService.startConnection();

    // Subscribe to location updates from SignalR
    this.signalrService.receiveLocation().subscribe((data) => {
      if (data.latitude !== undefined && data.longitude !== undefined) {
        this.ngZone.run(() => {
          // 🔥 Zapewnia, że zmiana zachodzi w Angularze
          this.markerPosition = { lat: data.latitude, lng: data.longitude };
          this.center = this.markerPosition;
          this.latitude = data.latitude;
          this.longitude = data.longitude;

          console.log('📍 Nowa lokalizacja:', this.latitude, this.longitude);
          this.cdRef.detectChanges(); // 🔥 Wymusza odświeżenie widoku
          // 🔥 Zapisz ostatnią lokalizację w localStorage
          localStorage.setItem(
            'lastLocation',
            JSON.stringify(this.markerPosition)
          );
        });
      } else {
        console.warn('❗ Nie otrzymano lokalizacji, używam domyślnej (0,0)');
      }
    });
  }

  // This method can be used to initialize the map once the component is loaded
  initializeMap() {
    const mapOptions: google.maps.MapOptions = {
      center: this.center,
      zoom: this.zoom,
    };

    // Create the map instance and assign it to googleMap
    this.googleMap = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );

    // Optionally create an initial marker
  }
}
