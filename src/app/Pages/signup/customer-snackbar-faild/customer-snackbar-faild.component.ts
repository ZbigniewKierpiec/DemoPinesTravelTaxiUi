import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-snackbar-faild',
  imports: [],
  templateUrl: './customer-snackbar-faild.component.html',
  styleUrl: './customer-snackbar-faild.component.scss',
  standalone:true
})
export class CustomerSnackbarFaildComponent {
 constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
