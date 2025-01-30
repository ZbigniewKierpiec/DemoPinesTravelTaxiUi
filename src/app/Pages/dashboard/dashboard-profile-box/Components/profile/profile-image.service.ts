import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
export interface BlogImage {
  id: string;
  fileName: string;
  title: string;
  fileExtenstion: string;
  url: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileImageService {
  constructor(private http: HttpClient, private cookiService: CookieService) {}
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtenstion: '',
    fileName: '',
    title: '',
    url: '',
  });

  // Method to update the selected image
  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }

  // Observable for other components to subscribe
  getSelectedImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }

  // uploadImage(
  //   file: File,
  //   fileName: string,
  //   title: string
  // ): Observable<BlogImage> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('fileName', fileName);
  //   formData.append('title', title);

  //   return this.http.post<BlogImage>(
  //     `${environment.apiBaseUrl}/api/ProfileImage/UploadImage`,
  //     formData
  //   );
  // }

  // getAllImages(): Observable<BlogImage[]> {
  //   return this.http.get<BlogImage[]>(
  //     `${environment.apiBaseUrl}/api/ProfileImage`
  //   );
  // }

  uploadImage(file: File, fileName: string, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/ProfileImage/UploadImage`,
      formData,
      {
        headers: {
          Authorization: this.cookiService.get('Authorization'), // Send token for authentication
        },
      }
    );
  }

  //////////////////////////////////////////

  updateUserProfile(profileDto: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/UserProfile/profile`,
      profileDto,
      {
        headers: {
          Authorization: this.cookiService.get('Authorization'), // Send token for authentication
        },
      }
    );
  }

  ///////////////////////////////////////

  // getAllImages(): Observable<BlogImage[]> {
  //   return this.http
  //     .get<{ $values: BlogImage[] }>(
  //       `${environment.apiBaseUrl}/api/ProfileImage`,
  //       {
  //         headers: {
  //           Authorization: this.cookiService.get('Authorization'), // Send token for authentication
  //         },
  //       }
  //     )
  //     .pipe(
  //       map((response) => response.$values) // Extract the array from the $values property
  //     );
  // }

  getAllImages(): Observable<BlogImage[]> {
    return this.http
      .get<{ $values: BlogImage[] }>(
        `${environment.apiBaseUrl}/api/ProfileImage`,
        {
          headers: {
            Authorization: this.cookiService.get('Authorization'), // Send token for authentication
          },
        }
      )
      .pipe(
        map((response) => {
          console.log('API Response:', response); // Log the full response
          return response.$values;
        }),
        catchError((error) => {
          console.error('Error fetching images:', error);
          return of([]); // Return an empty array in case of an error
        })
      );
  }
  ///////////////////////////////
  saveSingleProfileImage(imageDetails: BlogImage): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.cookiService.get('Authorization'), // Pobranie tokenu z cookies
    });

    // Wysyłamy zapytanie POST do API z danymi obrazu
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/ProfileImage/SaveSingleProfileImage`, // Zaktualizuj ścieżkę URL do swojego API
      imageDetails,
      { headers }
    );
  }
  /////////////////////////////////////////////////

  // Method to get the profile image

  // Method to get the profile images as an array
  getSingleProfileImages(): Observable<BlogImage[]> {
    // Notice the change to BlogImage[]
    const headers = new HttpHeaders({
      Authorization: this.cookiService.get('Authorization'), // Pobranie tokenu z cookies
    });

    // Return the GET request as an Observable of BlogImage array
    return this.http.get<BlogImage[]>(
      `${environment.apiBaseUrl}/api/ProfileImage/GetSingleProfileImage`,
      { headers }
    ); // Expecting an array of BlogImage
  }
}

//////////////////////////////////////////////////

// selectImage(image: BlogImage): void {
//   this.selectedImage.next(image);
// }

// onSelectImage(): Observable<BlogImage> {
//   return this.selectedImage.asObservable();
// }
