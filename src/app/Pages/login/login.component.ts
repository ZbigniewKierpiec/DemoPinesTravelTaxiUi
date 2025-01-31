import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import ValidateForm from '../../helpers/validateForm';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from './Models/login-request.model';
import { AuthService } from './Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { BookingService } from '../../Components/booking/Services/booking.service';
import { NotificationComponent } from "../../Components/notification/notification.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NotificationComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  model: LoginRequest;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private bookingService:BookingService
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    const loginData = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.valid) {
      console.log(loginData);
      this.model = loginData;
      this.authService.login(this.model).subscribe({

        next: (response: { token: string; email: string; roles: { $values: string[] } }) => {
          console.log('Login response:', response);

          // Set the authorization cookie
          this.cookieService.set(
            'Authorization',
            `Bearer ${response.token}`,
            undefined, // Expiry: Session cookie
            '/',       // Path
            undefined, // Domain
            true,      // Secure
            'Strict'   // SameSite policy
          );

          // Safely extract roles from response
          const roles = response.roles?.$values || [];

          // Set the authenticated user
          this.authService.setUser({
            email: response.email,
            roles: roles,
          });

          console.log('User set with roles:', roles);



          // Navigate to the homepage
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error('Login failed:', err);
          // Handle the error, e.g., show an error message to the user
        },


      });

      this.loginForm.reset();
    } else {
      ValidateForm.validateAllFormFileds(this.loginForm);
    }
  }
}
