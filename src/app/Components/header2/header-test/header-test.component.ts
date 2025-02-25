import { CommonModule, NgClass, NgFor, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Countries, Country } from '../../Interfaces/interface';
import { User } from '../../../Pages/login/Models/user.model';
import { StickyService } from '../../../Services/sticky.service';
import { CountryService } from '../../../Services/country.service';
import { AuthService } from '../../../Pages/login/Services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BookingService } from '../../booking/Services/booking.service';
import { LogoutService } from '../../../Pages/login/loging-welcome/logout.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HamburgerComponent } from '../../hamburger/hamburger.component';
import { FormsModule } from '@angular/forms';
import { HeaderMobileContactComponent } from '../../header/header-mobile-contact/header-mobile-contact.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';
import { LogoComponent } from './logo/logo.component';
import { TextComponent } from './text/text.component';

@Component({
  selector: 'app-header-test',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    CommonModule,
    RouterLinkActive,
    NgClass,
    NgStyle,
    HamburgerComponent,
    FormsModule,
    HeaderMobileContactComponent,
    TranslateModule,
    LogoComponent,
    TextComponent
  ],
  templateUrl: './header-test.component.html',
  styleUrl: './header-test.component.scss',
  animations: [
    // Animacja obracania strzałki
    trigger('rotateAnimation', [
      state('down', style({ transform: 'rotate(0deg)' })),
      state('up', style({ transform: 'rotate(180deg)' })),
      transition('down <=> up', animate('300ms ease-in-out')),
    ]),
    // Animacja rozwijania podmenu
    trigger('submenuAnimation', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class HeaderTestComponent {
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

  menuOpen: boolean = false;
  private userSub?: Subscription;
  @HostListener('window:resize', [])
  country: Country[] = Countries;
  user?: User;
  token?: any = '';
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private sticky: StickyService,
    private countryService: CountryService,
    private authService: AuthService,
    private router: Router,
    private bookingServices: BookingService,
    private logoutservice: LogoutService,
    private CookieService: CookieService
  ) {
    this.navbarOffsetTop = this.getNavbarOffsetTop();
    this.isMobile = this.checkIfMobile();
    this.token = this.CookieService.get('Authorization');
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
    this.menuOpen = !this.menuOpen;
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

    this.logoutservice.logOut();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.userSub = this.authService.user().subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;
      },
    });

    this.bookingServices.getMyBookings();

    this.user = this.authService.getUser();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
  onResize() {}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isSubmenuOpen = false;
  isCorporate?: any;
  toggleSubmenu(item: string) {
    this.isSubmenuOpen = !this.isSubmenuOpen;
    this.isCorporate = this.isCorporate === item ? null : item;
  }
  isMobile: boolean;

  checkIfMobile(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipod|ipad|android|blackberry|windows phone/.test(userAgent);
  }

  submenu(option: string) {
    this.menuOpen = false;

    const user = this.authService.getUser();
    let token = this.CookieService.get('Authorization');

    // Sprawdzamy, czy użytkownik jest zalogowany
    if (user || token) {
      // Użytkownik jest zalogowany
      switch (option) {
        case 'get-a-quote':
          // Przekierowanie do strony "Get a Quote"
          this.router.navigate(['bracknellTaxis/booking']);
          break;
        case 'make-booking':
          // Przekierowanie do strony "Make a Booking"
          this.router.navigate(['bracknellTaxis/booking']);
          break;
        case 'open-account':
          // Przekierowanie do strony konta użytkownika (np. profil)
          this.router.navigate(['bracknellTaxis/account']);
          break;
        case 'driver':
          // Przekierowanie do strony konta użytkownika (np. profil)
          this.router.navigate(['bracknellTaxis/driver']);
          break;

        default:
          console.log('Unknown option');
      }
    } else {
      // Użytkownik nie jest zalogowany
      if (option === 'open-account') {
        // Jeśli kliknięto "open-account", przekieruj do rejestracji (signup)
        this.router.navigate(['bracknellTaxis/signup']);
      } else {
        // Jeśli nie ma tokenu ani użytkownika, przekieruj na stronę logowania
        this.router.navigate(['bracknellTaxis/login']);
      }
    }
  }
}
