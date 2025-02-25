import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BookingService } from '../../../../../Components/booking/Services/booking.service';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileImageUploaderComponent } from './profile-image-uploader/profile-image-uploader.component';
import { BlogImage, ProfileImageService } from './profile-image.service';
import { map, Observable } from 'rxjs';
interface Link {
  id: number;
  name: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    EditProfileComponent,
    ProfileImageUploaderComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @ViewChildren('listItem') listItems: QueryList<ElementRef> =
    QueryList.prototype;
  @ViewChild('segmentedControl', { static: false })
  segmentedControl?: ElementRef;
  markerWidth: number = 0;
  profileName: string = '';
  allbookingsLength: number = 0;
  upcomingbookingsLength: number = 0;
  pastbookingsLength: number = 0;
  cancelledBookingsLength: number = 0;
  number: number = 0;
  isSame: any;
  url: string = '';
  single: string[] = [];
  links: Link[] = [
    { id: 1, name: 'personal info' },
    { id: 2, name: 'edit profile' },
    // { id: 3, icon: 'fa solid fa-table-columns', name: 'test' },
  ];

  constructor(
    private bookingService: BookingService,
    private renderer: Renderer2,
    private imageService: ProfileImageService,
    private profileImageService: ProfileImageService
  ) {}

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
        `translateX(${markerPosition}px)` // Move the marker horizontally
      );
    } else {
      console.error('Segmented control element (marker) not found.');
    }
  }

  onProfileUpdated(): void {
    this.number = 0; // Switch to personal info view
    this.selectLi(0);
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

    // Check if a profile image URL is saved in localStorage when the component is initialized
    const savedImageUrl = localStorage.getItem('profileImage');

    // this.imageService.onSelectImage().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.url = res.url;

    //     localStorage.setItem('profileImage', res.url); // Save the URL to localStorage

    //   },
    // });

    if (savedImageUrl) {
      this.url = savedImageUrl; // Initialize the profile image with the saved URL
    }

    this.bookingService.getUserProfile().subscribe(
      (profile) => {
        console.log('User Profile:', profile);
        this.profileName = profile.firstName + profile.surname;
      },
      (error) => {
        console.error('Error loading user profile:', error);
      }
    );

    // Correctly calling the method


    this.profileImageService.getSingleProfileImages().subscribe(
      (data: any) => {
        console.log(data);  // Logowanie odpowiedzi, aby zobaczyć strukturę

        // Sprawdzamy, czy pole ImageUrl istnieje w odpowiedzi
        if (data && data.imageUrl) {
          this.single = [data.imageUrl];  // Przypisanie URL obrazu do tablicy

            // Save image URL to localStorage
    


        } else {
          console.log('ImageUrl not found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching profile images:', error);
      }
    );


    this.imageService.getSelectedImage().subscribe((image) => {

      if (image && image.url) {
        this.single = [image.url];


      }





    });




  }
}
