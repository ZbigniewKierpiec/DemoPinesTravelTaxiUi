import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule ,  FormsModule,    ReactiveFormsModule ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {


  editProfileForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null; // For previewing the image
  constructor(private fb: FormBuilder) {

    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      landline: ['', [Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardNumber: ['', Validators.required],
      profileImage: [null],
    });


  }





// Handling image file selection
onImageChange(event: any): void {
  const file = event.target.files[0]; // Get the file from input
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result; // Set the image preview
    };

    reader.readAsDataURL(file); // Read the file as a data URL for preview
    this.editProfileForm.patchValue({ profileImage: file }); // Bind file to form control
  }
}








  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      landline: ['', [Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      console.log('Form Submitted!', this.editProfileForm.value);
    } else {
      console.log('Form is not valid');
    }
  }




}
