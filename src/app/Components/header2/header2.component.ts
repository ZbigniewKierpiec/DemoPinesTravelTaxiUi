import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { StickyService } from '../../Services/sticky.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HamburgerComponent } from "../hamburger/hamburger.component";
import { HeaderMobileContactComponent } from "../header/header-mobile-contact/header-mobile-contact.component";

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, HamburgerComponent, HeaderMobileContactComponent],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.scss'
})
export class Header2Component {
  @ViewChild('navBar', { static: false }) navBar!: ElementRef;
  @ViewChildren('listItem') listItems!: QueryList<ElementRef>; // Query for all li items
  @ViewChild('mobile') mobile?: ElementRef;
  @ViewChild('segmentedControl', { static: true })
  segmentedControl?: ElementRef; // Query for the slide element
  markerWidth: number = 0;
  isFixed = false;
  // navbarOffsetTop: number;
  isActive: boolean = false;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private sticky: StickyService
  ) {
    // this.navbarOffsetTop = this.getNavbarOffsetTop();
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

    console.log('Marker Position:', markerPosition); // Debug: Log marker position
    console.log('Marker Width:', markWidth); // Debug: Log marker width

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
    this.isActive =!this.isActive;
    console.log(this.isActive)
  }



//   getNavbarOffsetTop(): number {
//     const navbar = document.getElementById('navbar');
//     return navbar ? navbar.offsetTop : 0;
// }


// @HostListener('window:scroll', [])
// onWindowScroll() {
//     this.isFixed = window.pageYOffset > this.navbarOffsetTop;
// }

}
