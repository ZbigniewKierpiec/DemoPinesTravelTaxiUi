import { AfterViewInit, Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import AOS from 'aos'; // Import AOS
@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent implements AfterViewInit{
  translate: TranslateService = inject(TranslateService);
  ngAfterViewInit(): void {
    AOS.init({
      duration: 1700, // Animation duration in milliseconds
      delay:1000,
      offset: 100, // Start animation when the element is 200px from the viewport
      once: false, // Allow animations to trigger every time
    });
  }
}
