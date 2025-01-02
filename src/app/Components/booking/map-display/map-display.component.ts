import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input } from '@angular/core';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs';

export interface PlaceResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}
@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.scss',

})
export class MapDisplayComponent {
  @Input() from: PlaceResult | undefined;
  @Input() to: PlaceResult | undefined;
  @Input() isActiveMap: boolean = false;

  zoom: number = 5;

  mapWidth: string = '100%'; // Default width (e.g., "100%")
  mapHeight: string = '100%'; // Default height (e.g., "100%")

  directionResult: google.maps.DirectionsResult | undefined;
  constructor(
    private directionService: MapDirectionsService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;
    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    }
    this.cdr.detectChanges();

  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng) {
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionService
      .route(request)
      .pipe(map((res) => res.result))
      .subscribe((result) => {
        this.directionResult = result;
      });
  }

  updateMapSize() {
    const box = this.el.nativeElement.querySelector('.box');
    if (box) {
      this.mapWidth = `${box.clientWidth}px`;
      this.mapHeight = `${box.clientHeight}px`;
    }
    this.cdr.detectChanges();


  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateMapSize();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.updateMapSize(); // Initial size setup
    this.cdr.detectChanges();
  }
}
