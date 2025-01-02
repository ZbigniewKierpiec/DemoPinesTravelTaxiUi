import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

export interface PlaceResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}
@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent {
  @ViewChild('pickUpField') pickUpField!: ElementRef;
  @Input() placeholder = 'Pickup';

  @Output() placeChanged = new EventEmitter<PlaceResult>();
  autocomplete: google.maps.places.Autocomplete | undefined;
  @Output() focusStatusChange = new EventEmitter<boolean>();
  @Output() typingStatusChange = new EventEmitter<boolean>();
  isFocused: boolean = false;
  hasStartedTyping: boolean = false;
 constructor(private ng:NgZone){}
  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.pickUpField.nativeElement,
      {
        types: ['establishment','geocode'],
        componentRestrictions: { country: 'uk' },
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      const result: PlaceResult = {
        address: this.pickUpField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        imageUrl: this.getPhotoUrl(place),
        iconUrl: place?.icon,
      };
      console.log(result);
      this.ng.run(()=>{
        this.placeChanged.emit(result);
      })
        
    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }


 // Metoda uruchamiana przy fokusie
 onFocus() {
  this.isFocused = true;
  this.focusStatusChange.emit(this.isFocused); // Emituje status do komponentu rodzica
  console.log('Input uzyskał fokus');
}

// Metoda uruchamiana, gdy użytkownik zaczyna pisać lub przestaje pisać
onInput(event: any) {
  const inputValue = event.target.value;
  if (inputValue.length > 0 && !this.hasStartedTyping) {
    this.hasStartedTyping = true;
    this.typingStatusChange.emit(this.hasStartedTyping); // Emituje status do rodzica
    console.log('Użytkownik zaczął pisać!');
  } else if (inputValue.length === 0 && this.hasStartedTyping) {
    this.hasStartedTyping = false;
    this.typingStatusChange.emit(this.hasStartedTyping); // Emituje status do rodzica
    console.log('Użytkownik przestał pisać.');
  }
}



}
