import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  viewChild,
  NgZone,
  output,
  Output,
  EventEmitter,
  input,
  HostBinding,
} from '@angular/core';
import { CarBoobingQuoteComponent } from './car-boobing-quote/car-boobing-quote.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MapDisplayComponent } from './map-display/map-display.component';
import { Autocomplete2Component } from './autocomplete2/autocomplete2.component';
import { DistanceServiceService } from '../../Services/distance-service.service';
import { Router, RouterModule } from '@angular/router';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { CarService } from '../../Services/car.service';
import { ReactiveFormsModule } from '@angular/forms';
import ValidateForm from '../../helpers/validateForm';
import { NotificationComponent } from '../notification/notification.component';
import { RezerwacjaComponent } from '../rezerwacja/rezerwacja.component';
export interface PlaceResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    CarBoobingQuoteComponent,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    AutocompleteComponent,
    NgFor,
    MapDisplayComponent,
    Autocomplete2Component,
    RouterModule,
    BookingDetailComponent,
    ReactiveFormsModule,
    NotificationComponent,
    RezerwacjaComponent,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  // @ViewChild('pickUpField') pickUpField!: ElementRef;
  @ViewChild('destinUpField') destinUpField!: ElementRef;
  // @Input() placeholder = 'Pickup';
  @Input() placeholder2 = 'Destination';

  @Output() placeChanged = new EventEmitter<PlaceResult>();
  routeSelectName: string = '';
  animationState = 'in';
  autocomplete: google.maps.places.Autocomplete | undefined;
  autocomplete2: google.maps.places.Autocomplete | undefined;
  via: boolean = false;
  trip: string = '';
  bookingQuote: boolean = false;
  ngZone: any;
  from: PlaceResult | undefined;
  to: PlaceResult | undefined;
  distanceInMiles: number = 0;
  origen = '';
  destino = '';
  totalCostMerce: any = 0;
  totalCostIOniq: any = 0;
  formattedCost: string = '';
  isFocused: boolean = false;
  quoteForm!: FormGroup;
  isPastDate: boolean = false;
  datetimeValue: string | null = null;
  showLabel = false;
  constructor(
    private distanceService: DistanceServiceService,
    private router: Router,
    private carS: CarService,
    private fb: FormBuilder
  ) {
    this.quoteForm = this.fb.group({
      via: [''],
      data: ['', Validators.required],
      passengers: ['', Validators.required],
      luggage: ['', Validators.required],
      origin: ['', Validators.required], // Required field for origin
      destination: ['', Validators.required], // Required field for destination
      greet: [''],
    });
  }
  /////////////////////////////////////////

  ///////////////////////////////////////////////

  // datetimeValue: string | null = null;

  // Dodajemy metodę do formatowania daty na 24-godzinny format
  // get datetimeValueFormatted() {
  //   const value = this.quoteForm.get('data')?.value;
  //   return value
  //     ? new Date(value).toLocaleString('en-GB', { hour12: false })
  //     : null;
  // }

  get datetimeValueFormatted() {
    const value = this.quoteForm.get('data')?.value;
    return value
      ? new Date(value).toLocaleDateString('en-GB', {
          weekday: 'long', // Full weekday name (e.g., "Monday")
          day: 'numeric', // Day of the month as a number (e.g., "15")
          month: 'long', // Full month name (e.g., "September")
          year: 'numeric', // Full year (e.g., "2025")
        })
      : null;
  }

  importantPlaces = [
    {
      name: 'London Heathrow Airport - Terminal 2',
      price: 'Varies by airline',
    },
    {
      name: 'London Heathrow Airport - Terminal 3',
      price: 'Varies by airline',
    },
    {
      name: 'London Heathrow Airport - Terminal 4',
      price: 'Varies by airline',
    },
    {
      name: 'London Heathrow Airport - Terminal 5',
      price: 'Varies by airline',
    },
    { name: 'London Gatwick Airport', price: 'Varies by airline' },
    { name: 'London Luton Airport', price: 'Varies by airline' },
    { name: 'London City Airport', price: 'Varies by airline' },
    { name: 'London Stansted Airport', price: 'Varies by airline' },
    { name: 'London Southend Airport', price: 'Varies by airline' },
    { name: 'Frimley Park Hospital', type: 'Hospital', price: 'NHS services' },
    {
      name: 'Royal Berkshire Hospital',
      type: 'Hospital',
      price: 'NHS services',
    },
    {
      name: 'Bracknell Healthspace',
      type: 'Health Centre',
      price: 'NHS services',
    },
    { name: 'Wexham Park Hospital', type: 'Hospital', price: 'NHS services' },
    {
      name: 'Bracknell Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Ascot Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Reading Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Maidenhead Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Windsor & Eton Central',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Windsor & Eton Riverside',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Staines Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Wokingham Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Twyford Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    { name: 'Bracknell', type: 'Town', price: 'Free' },
    { name: 'Reading', type: 'Town', price: '28.00' },
    { name: 'Windsor', type: 'Town', price: 'Free' },
    { name: 'Maidenhead', type: 'Town', price: 'Free' },
    { name: 'Ascot', type: 'Town', price: 'Free' },
    { name: 'Farnborough', type: 'Town', price: 'Free' },
    { name: 'Camberley', type: 'Town', price: 'Free' },
    { name: 'Egham', type: 'Town', price: 'Free' },
    { name: 'Sunningdale', type: 'Village', price: 'Free' },
    { name: 'Thatcham', type: 'Town', price: 'Free' },
    { name: 'Slough', type: 'Town', price: 'Free' },
    { name: 'Chertsey', type: 'Town', price: 'Free' },
    { name: 'Lightwater', type: 'Village', price: 'Free' },
    { name: 'Wokingham', type: 'Town', price: 'Free' },
    { name: 'Twyford', type: 'Village', price: 'Free' },
    { name: 'Langley', type: 'Town', price: 'Free' },
  ];

  calculateDistance() {
    this.distanceService
      .getDistancia(this.origen, this.destino)
      .then((distance) => {
        this.distanceInMiles = distance / 1609.34; // Convert distance from meters to miles
        console.log('Distance (in miles):', this.distanceInMiles.toFixed(1));

        // Check if the pickup distance exceeds 20 miles
        // if (this.distanceInMiles > 20) {
        //   console.log('Distance exceeds 20 miles, please call the office.');
        //   // You can add any other actions you want to take, like triggering a notification.
        //   return; // If you want to stop further calculation when the distance exceeds 20 miles, use return.
        // }

        // Convert origen and destino to lowercase for uniform comparisons
        const origenLower = this.origen.toLowerCase();
        const destinoLower = this.destino.toLowerCase();

        // Check for "Heathrow" in either the origin or destination
        const isHeathrow =
          origenLower.includes('heathrow') || destinoLower.includes('heathrow');

        // Check for "Hounslow" in either the origin or destination
        const isHounslow =
          origenLower.includes('hounslow') || destinoLower.includes('hounslow');

        // Also check for specific Heathrow terminals
        const isTerminal =
          origenLower.includes('terminal') || destinoLower.includes('terminal');

        // Treat Hounslow as part of Heathrow when specific terminal names are involved
        const isHeathrowArea = isHeathrow || (isHounslow && isTerminal); // Assume Hounslow with "Terminal" refers to Heathrow

        const isGatwick =
          origenLower.includes('gatwick') || destinoLower.includes('gatwick');
        const isLuton =
          origenLower.includes('luton') || destinoLower.includes('luton');
        const isStansted =
          origenLower.includes('stansted') || destinoLower.includes('stansted');
        const isReading =
          origenLower.includes('reading') || destinoLower.includes('reading');
        const isWokingham =
          origenLower.includes('wokingham') ||
          destinoLower.includes('wokingham');
        const isCrowthorne =
          origenLower.includes('crowthorne') ||
          destinoLower.includes('crowthorne');
        const isSandhurst =
          origenLower.includes('sandhurst') ||
          destinoLower.includes('sandhurst');
        const isBracknell =
          origenLower.includes('bracknell') ||
          destinoLower.includes('bracknell');

        // Check for fixed prices between specific locations
        if (isHeathrowArea && isCrowthorne) {
          // Fixed cost for Crowthorne to Heathrow
          this.totalCostMerce = 60.0;
          this.totalCostIOniq = 60.0;
        } else if (isHeathrowArea && isSandhurst) {
          // Fixed cost for Sandhurst to Heathrow
          this.totalCostMerce = 63.0;
          this.totalCostIOniq = 63.0;
        } else if (isHeathrowArea && isWokingham) {
          // Fixed cost for Wokingham to Heathrow
          this.totalCostMerce = 60.0;
          this.totalCostIOniq = 60.0;
        } else if (isHeathrowArea && isBracknell) {
          // Fixed cost for Bracknell to Heathrow
          this.totalCostMerce = 55.0;
          this.totalCostIOniq = 55.0;
        } else if (isBracknell && isCrowthorne) {
          // Fixed cost for Crowthorne to Bracknell
          this.totalCostMerce = 15.0;
          this.totalCostIOniq = 15.0;
        } else if (isBracknell && isSandhurst) {
          // Fixed cost for Sandhurst to Bracknell
          this.totalCostMerce = 19.0;
          this.totalCostIOniq = 19.0;
        } else if (isHeathrowArea && isHounslow) {
          // Fixed cost for Hounslow to Heathrow
          this.totalCostMerce = 30.0; // Change this value as needed
          this.totalCostIOniq = 30.0;
        } else if (isHeathrow) {
          // Fixed cost for Heathrow
          this.totalCostMerce = 55.0;
          this.totalCostIOniq = 55.0;
        } else if (isGatwick || isLuton) {
          // Fixed cost for Gatwick and Luton
          this.totalCostMerce = 90.0;
          this.totalCostIOniq = 90.0;
        } else if (isStansted) {
          // Fixed cost for Stansted
          this.totalCostMerce = 140.0;
          this.totalCostIOniq = 140.0;
        } else if (isReading) {
          // Fixed cost for Reading Station
          this.totalCostMerce = 27.0;
          this.totalCostIOniq = 27.0;
        } else if (isWokingham) {
          // Fixed cost for Wokingham
          this.totalCostMerce = 15.0;
          this.totalCostIOniq = 15.0;
        } else {
          // Calculate the cost based on distance
          this.totalCostMerce = 7.0 + this.distanceInMiles * 1.76; // Initial cost of £7.00
          this.totalCostIOniq = 7.0 + this.distanceInMiles * 1.76; // Initial cost of £7.00

          // Ensure cost is at least £7.00
          if (this.totalCostMerce < 7.0) {
            this.totalCostMerce = 7.0;
          }

          if (this.totalCostIOniq < 7.0) {
            this.totalCostIOniq = 7.0;
          }
        }

        // Apply the additional £15.00 if greet is true
        if (this.quoteForm.value.greet) {
          this.totalCostMerce += 15.0; // Add £15.00 to totalCostMerce
          this.totalCostIOniq += 15.0; // Add £15.00 to totalCostIOniq
        }

        // Apply a 10% discount to totalCostIOniq
        const discount = this.totalCostIOniq * 0.1;
        this.totalCostIOniq -= discount;

        // Rounding logic
        this.totalCostMerce = this.roundCost(this.totalCostMerce);
        this.totalCostIOniq = this.roundCost(this.totalCostIOniq);

        // Format the costs to two decimal places
        this.totalCostMerce = this.totalCostMerce.toFixed(2);
        this.totalCostIOniq = this.totalCostIOniq.toFixed(2);

        console.log('Total cost for Merce: £', this.totalCostMerce);
        console.log(
          'Total cost for IOniq after 10% discount: £',
          this.totalCostIOniq
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Function to round costs according to specified rules
  roundCost(cost: any) {
    const roundedCost = Math.round(cost * 10) / 10; // Round to one decimal place

    if (roundedCost % 1 >= 0.51) {
      // If the cost is £X.51 or higher, round up to £X.60
      return Math.ceil(roundedCost); // Round up to the nearest whole number
    } else if (roundedCost % 1 >= 0.41) {
      // If the cost is £X.41 to £X.50, round down to £X.50
      return Math.floor(roundedCost * 10) / 10; // Round down to one decimal place
    } else {
      // If the cost is below £X.41, round down to the nearest whole number
      return Math.floor(roundedCost); // Round down to the nearest whole number
    }
  }

  ////////////////////////////////////////////////

  activeOne(item: 'one' | 'return'): void {
    this.trip = item;
  }

  viaFun(): void {
    this.via = true;
  }

  closeVia(): void {
    this.via = false;
  }

  @ViewChild(NotificationComponent) childComponent!: NotificationComponent; // Reference to child

  triggerNotificationFromParent(message: string) {
    this.childComponent.addNotification(message); // Calls addNotification() in child
  }
  isActiveMap: boolean = false;
  getQuote(): void {
    if (this.quoteForm && this.quoteForm.valid) {
      console.log(this.quoteForm.value);
      const pickupDate = this.quoteForm.get('data')?.value;

      // Check if the selected pickup date is in the past
      const now = new Date();
      const selectedDate = new Date(pickupDate);

      if (selectedDate < now) {
        console.error('The selected pickup date cannot be in the past.');

        this.triggerNotificationFromParent(
          'Please select a future date. Past dates are not allowed.'
        );
        this.isPastDate = true;
        return; // Stop further execution if the date is in the past
      }
      this.isPastDate = false;
      this.bookingQuote = true;
      this.calculateDistance();
      this.isActiveMap = true;
      // Additional logic for valid form submission can be added here
    } else {
      // Handle invalid form case
      console.error('Form is invalid:', this.quoteForm?.errors);
      this.triggerNotificationFromParent(
        'Quote submission failed: Please ensure all required fields are completed and that the information provided is in the correct format. Fields in red indicate missing or incorrect information. '
      );
      ValidateForm.validateAllFormFileds(this.quoteForm);
      // Optionally, show an error message to the user
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  auto(item: PlaceResult) {
    console.log(item);
    this.from = item;
    this.origen = item.address;
    // Update the form control for origin

    this.quoteForm.patchValue({ origin: item.address });
  }

  auto2(item: PlaceResult) {
    console.log(item.address);
    this.to = item;
    this.destino = item.address;
    this.quoteForm.patchValue({ destination: item.address });
  }

  ///////////////////////////////////////////////////////////////////

  changeFocus(isTyping: boolean) {
    console.log(isTyping);
    this.isFocused = isTyping;
  }

  onTypingStatusChange(isTyping: boolean) {
    if (isTyping) {
      this.isFocused = false;
    }
    console.log('Typing status in child:', isTyping);
  }

  ///////////////////////////////////////////////
  active: boolean = false;

  // carDetails = {
  //   pickup:'',
  //   destination:'',
  //   carType: 'SUV',
  //   active: false,
  //   image: 'url/to/image.jpg',
  //   price: '$30,000',
  // };

  handleCarClick(details: {
    carType: string;
    active: boolean;
    image: string;
    price: string;
  }) {
    // Ensure 'from' and 'to' locations are set properly before proceeding
    const pickup = this.origen; // Using 'origen' from auto() method
    const destination = this.destino; // Using 'destino' from auto2() method

    if (!pickup || !destination) {
      console.error('Pickup or destination is missing!');
      return;
    }

    // Prepare quoteForm values if available
    const quoteFormValues = this.quoteForm ? this.quoteForm.value : {};

    // Add pickup and destination to the details object
    const updatedDetails = {
      ...details,
      pickup: pickup,
      destination: destination,
      active: true,
      ...quoteFormValues,
    };

    // Update car details with the new object
    this.active = true;
    this.carS.updateCarDetails(updatedDetails);

    // Logic to handle the click event
    console.log('Car executive was clicked!');

    // this.active = true;
    // this.carS.updateCarDetails({ ...details, active: true });
  }
}
