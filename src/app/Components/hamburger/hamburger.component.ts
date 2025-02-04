import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.scss'
})
export class HamburgerComponent {
  @Output() menuToggled = new EventEmitter<void>();
  isOpen = false;
  toggleMenu() {
    console.log('toggle');
    this.menuToggled.emit();  // Emit the event to the parent
    this.isOpen = !this.isOpen;

  setTimeout(() => {
    this.isOpen = !this.isOpen;
    console.log('Back to previous state');
  }, 3000);


  }






}
