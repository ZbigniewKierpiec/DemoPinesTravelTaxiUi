import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-out',
          style({ opacity: 0, transform: 'translateY(-100px)' })
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent {
  @Output() notifyParent = new EventEmitter<string>();
  notifications: any[] = [];
  showNotification: boolean[] = [];
  num: number = 1;
  timera_1:number=1000;
  timera_2:number=5000;
  timerb_1:number=7000;
  timerb_2:number=7000;
  resetNotifications() {
    this.notifications = [];
    this.showNotification = [];
  }

  addNotification(message?: string) {
    // const newItem = this.generateRandomMessage();
    const newItem = message || this.generateRandomMessage(); // Use passed message or generate a new one
    const newIndex = 0; // Index of the newest notification

    // Add the new notification
    this.notifications.push({ content: newItem, index: newIndex });

    // Update indices of other notifications
    this.notifications.forEach((notification, index) => {
      notification.index = index;
    });

    // Update showNotification array to match the notifications array
    this.showNotification.unshift(true);

    setTimeout(() => {
      this.showNotification[newIndex] = false;

      setTimeout(() => {
        this.notifications.shift(); // Remove the first item from the array (which is now the oldest notification)
        this.showNotification.shift(); // Remove the corresponding showNotification flag

        // Update the indices of the remaining notifications
        this.notifications.forEach((notification, index) => {
          notification.index = index;
        });

        // Check if notifications array is empty, if so, reset it
        if (this.notifications.length === 0) {
          this.resetNotifications();
        }
      },this.timerb_1);
    }, this.timerb_2);
  }

  // generate a random message

  generateRandomMessage() {
    const messages = [
      'Hello!',
      'How are you?',
      'Have a great day!',
      "Don't forget to smile!",
      'Stay positive!',
      "You're awesome!",
      'Keep up the good work!',
      'Good morning!',
      'Good afternoon!',
      'Good evening!',
      "Hope you're doing well!",
      'Sending positive vibes your way!',
      "You're capable of amazing things!",
      'Believe in yourself!',
      'Dream big!',
      'Make today amazing!',
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }
}
