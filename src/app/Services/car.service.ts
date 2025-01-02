import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  // Create a BehaviorSubject to hold the car details
  private carDetailsSubject = new BehaviorSubject<{
    carType: string;
    active: boolean;
    image: string;
    price: string;
    pickup: string;
    destination: string;
    via?: string;
    data: string;
    passengers: string;
    luggage: string;
    greet: boolean;
  } | null>(null);

  // Observable for components to subscribe to
  carDetails$ = this.carDetailsSubject.asObservable();

  // Method to update car details
  updateCarDetails(details: {
    carType: string;
    active: boolean;
    image: string;
    price: string;
    pickup: string;
    destination: string;
    via?: string;
    data: string;
    passengers: string;
    luggage: string;
    greet: boolean;
  }) {
    this.carDetailsSubject.next(details);
  }

  getCarDetails() {

    return this.carDetailsSubject.getValue();

  }







}
