import { Component, Input, OnInit } from '@angular/core';
import { CarService } from '../../../../Services/car.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-detail-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-detail-price.component.html',
  styleUrl: './car-detail-price.component.scss',
})
export class CarDetailPriceComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  pickup: string = '';
  destination: string = '';
  carDetails: {
    carType: string;
    active: boolean;
    image: string;
    price: string;
  } | null = null;

  constructor(private carS: CarService) {}

  ngOnInit() {
    // Subscribe to the carDetails observable
    this.subscription = this.carS.carDetails$.subscribe((details) => {
      this.carDetails = details; // Update carDetails whenever it changes
     
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
