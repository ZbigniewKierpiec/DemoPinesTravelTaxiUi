import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CarDetailPriceComponent } from './car-detail-price/car-detail-price.component';
import { CarService } from '../../../Services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, CarDetailPriceComponent],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent implements OnInit{
  @Input() active: boolean = false;
  pickup?: string = '';
  destination?: string = '';
  via?:string='';
  data?:string='';
  passengers?:string='';
  luggages?:string='';
  greet?:boolean=false;
  carDetails: any = null;
  signUpForm!: FormGroup;
  private subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private carS: CarService) {}


  ngOnInit() {
    // Subscribe to the carDetails observable

    console.log(this.carS.getCarDetails())
    console.log('zbtszek')
    this.carDetails= this.carS.getCarDetails();
  }











  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
