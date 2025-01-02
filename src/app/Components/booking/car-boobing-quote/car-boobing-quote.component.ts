import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-car-boobing-quote',
  standalone: true,
  imports: [NgClass],
  templateUrl: './car-boobing-quote.component.html',
  styleUrl: './car-boobing-quote.component.scss',
})
export class CarBoobingQuoteComponent {
  @Input() image: string = '';
  @Input() customClass: string = '';
  @Input() price: string = '';
  @Input() active: boolean = false;
  @Input() carType: string = '';
  @Output() clicked: EventEmitter<{
    carType: string;
    active: boolean;
    image: string;
    price: string;
  }> = new EventEmitter();

  onClick() {
    this.clicked.emit({
      carType: this.carType,
      active: this.active,
      image: this.image,
      price: this.price,
    });
  }
}
