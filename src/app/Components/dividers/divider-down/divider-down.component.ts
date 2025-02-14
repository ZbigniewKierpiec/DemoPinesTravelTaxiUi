import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import AOS from 'aos'; // Import AOS
@Component({
  selector: 'app-divider-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider-down.component.html',
  styleUrl: './divider-down.component.scss'
})
export class DividerDownComponent implements OnInit , AfterViewInit {
  @Input() aosAnimation: string = '';
  @Input() bgColor: string = '#8eb98f'; 
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
