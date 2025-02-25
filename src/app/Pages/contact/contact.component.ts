import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoComponent } from "../../Components/header2/header-test/logo/logo.component";

@Component({
  selector: 'app-contact',
  imports: [CommonModule, LogoComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone:true
})
export class ContactComponent {
  currentYear(): number {
    return new Date().getFullYear();
  }
}
