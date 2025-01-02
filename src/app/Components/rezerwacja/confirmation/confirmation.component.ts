import { Component, Input, input, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [  RouterModule ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() isActive: boolean = false;
  constructor(private router: Router){}
  close() {
    this.isActive = false;
    this.router.navigate(['bracknellTaxis/home']);
  }


}
