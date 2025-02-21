import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-driver-notification',
  imports: [CommonModule],
  templateUrl: './driver-notification.component.html',
  styleUrl: './driver-notification.component.scss',
  standalone:true,
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
export class DriverNotificationComponent {


 @Output() notifyParent = new EventEmitter<string>();
  notifications: any[] = [];
  showNotification: boolean[] = [];
  num: number = 1;
  timera_1:number=1000;
  timera_2:number=4000;
  timerb_1:number=4000;
  timerb_2:number=5000;
  resetNotifications() {
    this.notifications = [];
    this.showNotification = [];
  }

  addNotification(message?: string) {
    // const newItem = this.generateRandomMessage();
    const newItem = message // Use passed message or generate a new one
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

}
