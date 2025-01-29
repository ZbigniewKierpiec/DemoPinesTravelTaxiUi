import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BlogImage, ProfileImageService } from '../profile-image.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-image-uploader',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './profile-image-uploader.component.html',
  styleUrl: './profile-image-uploader.component.scss',
})
export class ProfileImageUploaderComponent implements OnInit {
  fileName: string = '';
  title: string = '';
  selectedFile: any = null;
  uploadButtonDisabled: boolean = false; // Flag to disable the upload button
  images$?: Observable<BlogImage[]>;

  constructor(private imageService: ProfileImageService) {}

  // Handle file change and update selectedFile
  onFileChange(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    // Only allow one file to be selected at a time
    this.selectedFile = element.files?.[0];

    // If a file is selected, enable the upload button
    if (this.selectedFile) {
      this.uploadButtonDisabled = false;
    }
  }

  // Handle upload logic
  onUpload() {
    // Check if a file is selected and fields are filled
    if (this.selectedFile && this.fileName && this.title) {
      this.imageService
        .uploadImage(this.selectedFile, this.fileName, this.title)
        .subscribe({
          next: (res) => {
            console.log(res);

            this.getImages();
          },
        });
      // Disable upload button after upload to prevent multiple uploads
      this.uploadButtonDisabled = true;

      // Optionally, reset the file input and other fields
      this.fileName = '';
      this.title = '';
      this.selectedFile = null;
      // Reset the file input element (clear the file selected by the user)
      const fileInput: HTMLInputElement = document.querySelector('#fileInput')!;
      if (fileInput) {
        fileInput.value = ''; // Clear the input file
      }
    } else {
      alert('Please fill in all fields and select an image.');
    }
  }


  selectprofileImage(item:BlogImage):void{
console.log(item.id)
this.imageService.selectImage(item);
localStorage.setItem('profileImage', item.url);


  }










  ngOnInit(): void {
    this.getImages();
    console.log(this.images$);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }
}
