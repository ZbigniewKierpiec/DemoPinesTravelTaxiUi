import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { LogoutService } from '../../login/loging-welcome/logout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logoutnotif',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logoutnotif.component.html',
  styleUrl: './logoutnotif.component.scss',
})
export class LogoutnotifComponent implements OnInit , OnDestroy {
  isActive: boolean = false;
  private logoutSub!: Subscription;
  messages: string[] = [
    "You just logged out! 👋 We're sad to see you go.",
    "Logged out successfully! See you next time! 😊",
    "Session ended. Hope to see you soon! 🚀",
    "You've been logged out. Stay safe! 🔒",
    "Goodbye for now! Come back anytime! 👋",
  ];

  randomMessage: string = this.messages[0]; // Domyślna wiadomość

  constructor(private logOut: LogoutService) {}

  ngOnInit(): void {
    this.logoutSub = this.logOut.logOut$.subscribe((a) => {
      if (!a || this.isActive) return; // Ignorujemy, jeśli wartość to `false` lub już aktywne

      this.isActive = true;
      this.randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)];

      console.log(this.randomMessage);

      setTimeout(() => {
        this.isActive = false;
      }, 5000);
    });
  }

  ngOnDestroy(): void {
    this.logoutSub?.unsubscribe();
  }

}
