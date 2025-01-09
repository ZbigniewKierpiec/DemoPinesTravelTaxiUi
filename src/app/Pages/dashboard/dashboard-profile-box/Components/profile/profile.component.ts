import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { BookingService } from '../../../../../Components/booking/Services/booking.service';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from "./personal-info/personal-info.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
interface Link {
  id: number;
  name: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PersonalInfoComponent, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @ViewChildren('listItem') listItems: QueryList<ElementRef> = QueryList.prototype;
  @ViewChild('segmentedControl', { static: false }) segmentedControl?: ElementRef;
  markerWidth: number = 0;

  allbookingsLength: number = 0;
  upcomingbookingsLength: number = 0;
  pastbookingsLength: number = 0;
  cancelledBookingsLength: number = 0;
  number:number=0;
  isSame:any;

  links: Link[] = [
    { id: 1,name: 'personal info' },
    { id: 2,name: 'edit profile' },
    // { id: 3, icon: 'fa solid fa-table-columns', name: 'test' },
  ];

  constructor(private bookingService: BookingService ,   private renderer: Renderer2 ) {}










  selectLi(index: number): void {
    // Ensure the listItems query has been initialized and contains elements
    this.number = index;
    const listArray = this.listItems.toArray();
    if (index < 0 || index >= listArray.length) {
      console.error(`Invalid index: ${index}. No list item found.`);
      return;
    }

    // Get the selected list item element
    const selectedTabElement = listArray[index].nativeElement;
    console.log('Selected Tab Element:', selectedTabElement);

    // Get the position and width of the selected tab element
    const markerPosition = selectedTabElement.offsetLeft;
    const markWidth = selectedTabElement.offsetWidth;

    // Update the marker width
    this.markerWidth = markWidth;

    // Check if the segmentedControl (marker) exists
    if (this.segmentedControl) {
      // Move the marker ('.slide') to the selected tab position
      this.renderer.setStyle(
        this.segmentedControl.nativeElement,
        'transform',
        `translateX(${markerPosition}px)`  // Move the marker horizontally
      );
    } else {
      console.error('Segmented control element (marker) not found.');
    }
  }
















  ngOnInit(): void {
    this.bookingService.countMyBookings().subscribe((data) => {
      this.allbookingsLength = data;
    });

    this.bookingService.countUpcomingBookings().subscribe((data) => {
      this.upcomingbookingsLength = data;
    });

    this.bookingService.countCancelledBookings().subscribe((data) => {
      this.cancelledBookingsLength = data;
    });
  }
}
