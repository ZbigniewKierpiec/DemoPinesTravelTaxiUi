import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import ValidateForm from '../../helpers/validateForm';
import { AuthService, RegisterRequest } from '../login/Services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf,RouterLink,ReactiveFormsModule],

templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,

  ) {}

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSingup() {


    const signData:RegisterRequest = {
      // firstName: this.signUpForm.value.firstName,
      // lastName: this.signUpForm.value.lastName,
      email:this.signUpForm.value.email,
      // name:this.signUpForm.value.userName,
      password:this.signUpForm.value.password,
    };




    this.authService.register(signData).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
      },
      error: (err) => {
        console.error('Registration failed', err);
      },
    });




    if (this.signUpForm.valid) {
      console.log(signData)
      /////////////////////////////





      ////////////////////////////
      this.signUpForm.reset();
    } else {
      ValidateForm.validateAllFormFileds(this.signUpForm);
      alert()
    }
  }
}
