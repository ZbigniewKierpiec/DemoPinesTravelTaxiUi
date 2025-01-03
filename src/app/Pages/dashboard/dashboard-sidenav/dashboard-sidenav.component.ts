import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../Services/notification.service';
import { RouterLink } from '@angular/router';
// Define the interface for the Link object
interface Link {
  id: number;
  icon: string;
  name: string;
  route:string;
}
@Component({
  selector: 'app-dashboard-sidenav',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './dashboard-sidenav.component.html',
  styleUrl: './dashboard-sidenav.component.scss',
})
export class DashboardSidenavComponent implements OnInit {
  currentUrl: any;
  // Reference to slider element
  @ViewChild('slider', { static: true }) slider?: ElementRef;
  private sideMenuSubscription?: Subscription;
  constructor(
    private renderer: Renderer2,
    private notificationService: NotificationService
  ) {}
  // Array of menu items
  links: Link[] = [
    { id: 1, icon: 'fa solid fa-house', name: 'dashboard',  route: 'home' },
    { id: 2, icon: 'fa solid fa-chart-line', name: 'test' , route:'booking-list' },
    // { id: 3, icon: 'fa solid fa-table-columns', name: 'test' },
  ];
  // Track the active item
  activeItem: string | null = null;

  // Track whether the side menu is active
  isActive = false;
  // Track whether the same item is clicked again
  isSame?: number;
  // Handle item click event
  handleItemClick(event: MouseEvent, item: Link, index: number) {
    // Get the offset top position of the clicked item
    const offsetTop = (event.currentTarget as HTMLElement).offsetTop;
    console.log(item);
    // console.log(item.name);
    // this.currentUrlService.setCurrentUrl(item.name);

    // Set the active item
    this.activeItem = item.name;

    this.isSame = item.id;

    // Set the slider position
    if (this.slider && this.slider.nativeElement) {
      this.renderer.setStyle(
        this.slider.nativeElement,
        'top',
        offsetTop + 'px'
      );
    } else {
      console.error('Slider element is not available');
    }

    // if (item.name === 'dashboard') {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.router.navigate(['']);
    // }
  }
  // Handle burger menu click event to toggle side menu visibility
  handleActiveBurger() {
    this.isActive = !this.isActive;
  }
  // Handle click event to toggle side menu visibility
  handleClick() {
    console.log('Click event received in Component 2');
    this.isActive = !this.isActive;
    console.log(this.isActive);
  }

  // Subscribe to click events from EventService
  ngOnInit(): void {

    this.notificationService.currentSideNavState.subscribe((state) => {
      this.isActive = state;

    });


  }

  ngOnDestroy(): void {
    if (this.sideMenuSubscription) {
      this.sideMenuSubscription.unsubscribe();
    }
  }
}
