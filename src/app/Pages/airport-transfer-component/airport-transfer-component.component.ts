import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TextBannerComponent } from "./text-banner/text-banner.component";
import { TextWraperComponent } from "./text-wraper/text-wraper.component";
import AOS from 'aos';
@Component({
  selector: 'app-airport-transfer-component',
  standalone: true,
  imports: [TextBannerComponent, TextWraperComponent],
  templateUrl: './airport-transfer-component.component.html',
  styleUrl: './airport-transfer-component.component.scss'
})
export class AirportTransferComponentComponent implements OnInit , AfterViewInit {
  constructor() {
    AOS.refresh(); // Refresh AOS after view is initialized
  }

  ngOnInit(): void {
    AOS.init({
      duration: 1000, // Duration of animations
      once: false, // Whether animations should happen only once
    });

  }

  ngAfterViewInit() {
    AOS.refresh(); // Refresh AOS after view is initialized

    AOS.init({
      duration: 1000, // Duration of animations
      once: false, // Whether animations should happen only once
    });
  }
}
