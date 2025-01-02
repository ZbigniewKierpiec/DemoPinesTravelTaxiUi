import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  NgModule,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StickyService } from '../../Services/sticky.service';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { HamburgerComponent } from '../hamburger/hamburger.component';
import { FormsModule, NgModel } from '@angular/forms';
import { HeaderMobileContactComponent } from './header-mobile-contact/header-mobile-contact.component'; // <-- Import FormsModule
import { Countries, Country } from '../Interfaces/interface';

import { CountryService } from '../../Services/country.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../Pages/login/Services/auth.service';
import { User } from '../../Pages/login/Models/user.model';
import { BookingService } from '../booking/Services/booking.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgStyle,
    HamburgerComponent,
    FormsModule,
    HeaderMobileContactComponent,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild('navBar', { static: false }) navBar!: ElementRef;
  @ViewChildren('listItem') listItems!: QueryList<ElementRef>; // Query for all li items
  @ViewChild('mobile') mobile?: ElementRef;
  @ViewChild('segmentedControl', { static: true })
  segmentedControl?: ElementRef; // Query for the slide element
  markerWidth: number = 0;
  isFixed = false;
  navbarOffsetTop: number;
  isActive: boolean = false;
  languages: string = 'https://flagpedia.net/data/flags/w580/gb.webp';
  isSame?: number;
  dotContent: number = 0;
  isActiveList: boolean = false;

  country: Country[] = Countries;
  user?: User;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private sticky: StickyService,
    private countryService: CountryService,
    private authService: AuthService,
    private router: Router,
    private bookingServices: BookingService
  ) {
    this.navbarOffsetTop = this.getNavbarOffsetTop();
  }

  selectLi(index: number): void {
    // Ensure the list items are available
    const listArray = this.listItems.toArray();
    if (!listArray[index]) {
      console.error(`List item at index ${index} not found`);
      return;
    }

    const selectedTabElement = listArray[index].nativeElement;

    console.log('Selected Tab Element:', selectedTabElement); // Debug: Log selected tab

    // Calculate the position and width of the tab marker
    const markerPosition = selectedTabElement.offsetLeft;
    const markWidth = selectedTabElement.offsetWidth;

    // Update the marker width
    this.markerWidth = markWidth;

    // Move the marker ('.slide') using Renderer2
    if (this.segmentedControl) {
      this.renderer.setStyle(
        this.segmentedControl.nativeElement,
        'transform',
        `translateX(${markerPosition}px)`
      );
    } else {
      console.error('Segmented control element not found.');
    }
  }

  onMenuToggle() {
    console.log('Menu toggled in parent component!');
    // Perform any logic here when the hamburger menu is toggled
    this.isActive = !this.isActive;
    console.log(this.isActive);
  }

  getNavbarOffsetTop(): number {
    const navbar = document.getElementById('navbar');
    return navbar ? navbar.offsetTop : 0;
  }
  //////////////////////////////////////

  // Method to handle country selection dropdown
  onCountrySelection() {
    this.isActiveList = !this.isActiveList;
    console.log(this.isActiveList);
  }

  translate: TranslateService = inject(TranslateService);
  // Method to choose a country and update the flag
  choseCountry(item: Country) {
    console.log(item.lang);
    this.isSame = item.id;
    this.languages = item.flag;
    this.isActiveList = !this.isActiveList;

    // Store the flag URL in local storage
    // localStorage.setItem('selectedCountryFlag', item.flag);
    // window.location.reload();

    this.countryService.setLanguage(item.lang);
  }

  /////////////////////////////////////
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isFixed = window.pageYOffset > this.navbarOffsetTop;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;
      },
    });

    this.bookingServices.getMyBookings();

    this.user = this.authService.getUser();
  }
}
