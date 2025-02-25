import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { gsap } from 'gsap';
interface Slide {
  title: string;
  subtitle?: string;
  img: string;
}

@Component({
  selector: 'app-slider-text',
  imports: [CommonModule, NgFor],
  templateUrl: './slider-text.component.html',
  styleUrl: './slider-text.component.scss',
  standalone: true,
  animations: [
    trigger('fadeText', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('1s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SliderTextComponent {
  slides: Slide[] = [
    {
      title: 'Luxury Executive Travel',
      subtitle:
        ' For those who demand nothing but the finest, Pines Executive Cars Ltd. offers a distinguished car service that embodies professionalismand sophistication. Elevate your journey with us. ',
      img: '/assets/executive.jpg',
    },

    {
      title: 'Seamless Airport Transfers',
      subtitle:
        ' Experience effortless travel with Pines Executive Cars. Ourexceptional airport transfer service ensures timely and luxurioustransportation to all major airports nationwide. ',
      img: '/assets/airport.jpg',
    },
    {
      title: 'Professional Taxi Service – Always on Time!',
      subtitle:
        'Our company offers fast, comfortable, and safe transportation within the city and surrounding areas. With us, you’ll travel in comfort, and our experienced drivers will ensure your safety and satisfaction.',
      img: '/assets/pexels-pavel-danilyuk-8425044.jpg',
    },
  ];
  activeSlide = 0;
  prevSlide = -1;
  sliderReady = false;
  autoChangeTime = 7000;
  changeTO: any;

  ngOnInit() {
    this.sliderReady = true;
    this.runAutoChange();
  }

  ngOnDestroy() {
    clearTimeout(this.changeTO);
  }

  runAutoChange() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutoChange();
    }, this.autoChangeTime);
  }

  changeSlides(change: number) {
    clearTimeout(this.changeTO);
    this.prevSlide = this.activeSlide;
    this.activeSlide =
      (this.activeSlide + change + this.slides.length) % this.slides.length;
    this.runAutoChange();
  }
}
