import { Component, Input, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { CarService } from '../../Services/car.service';
import { CommonModule } from '@angular/common';
import { CarDetailPriceComponent } from '../booking/booking-detail/car-detail-price/car-detail-price.component';
import ValidateForm from '../../helpers/validateForm';

import { customEmailValidator } from './emailValidator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AddBookingRequest } from '../booking/Model/add-booking-request.model';
import { BookingService } from '../booking/Services/booking.service';
@Component({
  selector: 'app-rezerwacja',
  standalone: true,
  imports: [
    CommonModule,
    CarDetailPriceComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmationComponent,
  ],
  templateUrl: './rezerwacja.component.html',
  styleUrl: './rezerwacja.component.scss',
})
export class RezerwacjaComponent implements OnInit {
  model: AddBookingRequest;

  private subscription: Subscription = new Subscription();
  private addBookingsubscription: Subscription = new Subscription();
  @Input() active: boolean = false;
  bookingForm!: FormGroup;
  pickup: string = '';
  destination: string = '';
  via: string = '';
  data: string = '';
  passengers: string = '';
  luggage: string = '';
  greet: boolean = false;
  price: number = 0;
  carType: string = '';
  carImage: string = '';
  name: string = '';
  email: string = '';
  isActive: boolean = false;
  // mobile: string = '';

  // instructions: string = '';

  formData: any = {};
  emailForm: FormGroup | undefined;
  constructor(
    private fb: FormBuilder,
    private carS: CarService,
    private http: HttpClient,
    private bookingService: BookingService
  ) {
    this.bookingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{7,15}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      instructions: new FormControl(''),
    });

    this.model = {
      pickupLocation: '',
      via: '',
      dropoffLocation: '',
      pickupTime: '',
      passengers: '',
      louggages: '',
      greet: false,
      price: 0,
      carType: '',
      carImage: '',
      name: '',
      phoneNumber: '',
      email: '',
      driverInstruction: '',
    };


  }

  async book() {
    if (this.bookingForm.valid) {
      this.formData = this.bookingForm.value;

      // this.model.Pickup = this.pickup;
      // this.model.DropOff = this.destination;
      this.model.name = this.bookingForm.value.name;
      this.model.phoneNumber = this.bookingForm.value.mobile;
      // this.model.CarType = this.carType;
      // this.model.CarImage = this.carImage;
      // this.model.Price = this.price;
      this.model.driverInstruction = this.bookingForm.value.instructions;
      // this.model.Greet = this.greet;
      this.model.email = this.bookingForm.value.email;
      // this.model.luggage = this.luggage;
      // this.model.Passengers = this.passengers;
      // this.model.PickUpDate = this.data;
      // this.model.Via = this.via;

      const payload = {
        pickup: this.pickup,
        destination: this.destination,
        via: this.via,
        data: this.data,
        passengers: this.passengers,
        luggage: this.luggage,
        greet: this.greet,
        name: this.bookingForm.get('name')?.value || '', // Optional name field
        mobile: this.bookingForm.get('mobile')?.value || '', // Optional mobile field
        email: this.bookingForm.get('email')?.value || '', // Optional email field
        instructions: this.bookingForm.get('instructions')?.value || '', // Optional instructions field
        carType: this.carType,
        carImage: this.carImage,
        price: this.price,
      };
      this.name = this.bookingForm.get('name')?.value || '';
      (this.email = this.bookingForm.get('email')?.value || ''),
        emailjs.init('169d31qPmdVNK5UZg');


      this.isActive = true;
      console.log(this.model);
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional: Adds smooth scrolling
      });

      console.log('zbyszek test ' + this.model.carType);
      this.addBookingsubscription = this.bookingService

        .addBooking(this.model)

        .subscribe({
          next: (resp) => {
            console.log('This booking was suucces' + this.model.louggages);
            console.log(resp);
            this.isActive = true;
          },
          error: (error) => {
            alert('Something went wrong');
            console.log(error);
            ValidateForm.validateAllFormFileds(this.bookingForm);
            this.isActive = false;
            this.bookingForm.markAllAsTouched();
          },
        });

      this.bookingForm.reset();
    } else {
      // ValidateForm.validateAllFormFileds(this.bookingForm);
      // this.isActive = false;
      // this.bookingForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    // Subscribe to the carDetails observable
    this.subscription = this.carS.carDetails$.subscribe((details) => {
      if (details) {
        // Update carDetails whenever it changes
       console.log(details.data)
        this.model.dropoffLocation = details?.destination || '';
        this.model.pickupLocation = details?.pickup || '';
        this.model.via = details?.via || '';
        this.model.pickupTime = details?.data || '';
        this.model.passengers = details?.passengers || '';
        this.model.louggages = details?.luggage || '';
        this.model.greet = details?.greet || false;
        this.model.carType = details?.carType || '';
        this.model.carImage = details?.image || '';
        this.model.price = parseFloat(details?.price as string) || 0;

        /////////////////////////////////////////////////////
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
    this.addBookingsubscription.unsubscribe();
  }
}
