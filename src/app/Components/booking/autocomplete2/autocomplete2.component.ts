import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';

export interface PlaceResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}
@Component({
  selector: 'app-autocomplete2',
  standalone: true,
  imports: [],
  templateUrl: './autocomplete2.component.html',
  styleUrl: './autocomplete2.component.scss',
})
export class Autocomplete2Component {
  @ViewChild('destinUpField') destinUpField!: ElementRef;
  // @Input() placeholder = 'Pickup';
  @Input() placeholder2 = 'Destination';

  @Output() placeChanged = new EventEmitter<PlaceResult>();
  constructor(private ng: NgZone) {}
  // autocomplete: google.maps.places.Autocomplete | undefined;
  autocomplete2: google.maps.places.Autocomplete | undefined;

  ngAfterViewInit() {
    this.autocomplete2 = new google.maps.places.Autocomplete(
      this.destinUpField.nativeElement,
      {
        types: ['establishment','geocode'],
        componentRestrictions: { country: 'uk' },
      }
    );

    this.autocomplete2.addListener('place_changed', () => {
      const place = this.autocomplete2?.getPlace();
      const result: PlaceResult = {
        address: this.destinUpField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        imageUrl: this.getPhotoUrl(place),
        iconUrl: place?.icon,
      };
      console.log(result);
      this.ng.run(() => {
        this.placeChanged.emit(result);
      });
    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }
}
