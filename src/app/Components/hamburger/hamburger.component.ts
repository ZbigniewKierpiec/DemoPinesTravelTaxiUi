import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.scss'
})
export class HamburgerComponent {
  @Output() menuToggled = new EventEmitter<void>();


  toggleMenu() {
    console.log('toggle');
    this.menuToggled.emit();  // Emit the event to the parent
  }

}
