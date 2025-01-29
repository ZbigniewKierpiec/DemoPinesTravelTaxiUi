import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BookingService,
  UserProfile,
} from '../../../../../../Components/booking/Services/booking.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],

  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  editProfileForm: FormGroup;
  @Output() profileUpdated = new EventEmitter<void>();
  imagePreview: string | ArrayBuffer | null = null; // For previewing the image
  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.editProfileForm = this.fb.group({
      ID: ['', Validators.required],
      firstName: ['', Validators.required],
      surname: ['', Validators.required],

      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      landline: ['', [Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  // paymentMethod: ['', Validators.required],
  // cardNumber: ['', Validators.required],

  // Handling image file selection

  ngOnInit(): void {
    this.loadUserProfile();
    // this.editProfileForm = this.fb.group({
    //   ID: ['', Validators.required],
    //   firstName: ['', Validators.required],
    //   surname: ['', Validators.required],
    //   // dob: ['', Validators.required],
    //   dob: ['2025-01-21', Validators.required],
    //   gender: ['', Validators.required],
    //   mobile: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
    //   landline: ['', [Validators.pattern('[0-9]{12}')]],
    //   email: ['', [Validators.required, Validators.email]],
    //   address: ['', Validators.required],

    // });
  }

  onSubmit(): void {
    console.log(this.editProfileForm.value);
    if (this.editProfileForm.valid) {
      const profileDto: UserProfile = this.editProfileForm.value;

      this.bookingService.updateUserProfile(profileDto).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          alert('Profile updated successfully');
        // Emit the event to notify the parent that the profile is updated
         this.profileUpdated.emit();

        },
        error: (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile');
        },
      });
    } else {
      alert('Form is invalid');
    }
  }




























  loadUserProfile(): void {
    this.bookingService.getUserProfile().subscribe(
      (profile) => {
        console.log('User Profile:', profile);
        // After getting the profile data, populate the form fields
        this.editProfileForm.patchValue({
          ID: profile.id,
          firstName: profile.firstName,
          surname: profile.surname,

          birthday: profile.birthday,
          gender: profile.gender,
          mobile: profile.mobile,
          landline: profile.landline,
          email: profile.email,
          address: profile.address,

        });
      },
      (error) => {
        console.error('Error loading user profile:', error);
      }
    );
  }
}
