import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardNotyficationItemComponent } from "../dashboard-header/dashboard-notyfication-item/dashboard-notyfication-item.component";
import { NotificationService } from '../../../Services/notification.service';

export interface Notification {
  id: number;
  name: string;
  message: string;
  date: Date;
}
@Component({
  selector: 'app-dashboard-notifications-box',
  standalone: true,
  imports: [CommonModule, DashboardNotyficationItemComponent],
  templateUrl: './dashboard-notifications-box.component.html',
  styleUrl: './dashboard-notifications-box.component.scss'
})
export class DashboardNotificationsBoxComponent {

  notificationCount: number = 0;

  showBox = false;
  constructor(private notificationService: NotificationService) {}



  notifications: Notification[] = [
    {
      id: 1,
      name: 'John Doe',
      message: 'You have a new message!',
      date: new Date('2024-06-26'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'Your order has been shipped.',
      date: new Date('2024-06-23'),
    },
    {
      name: 'Alice Johnson',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-06-23'),
      id: 3,
    },

    {
      id: 4,
      name: 'Parces sended',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-08-26'),
    },

    {
      id: 5,
      name: 'Parces sended',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-03-26'),
    },


    {
      id: 6,
      name: 'Parces sended',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-12-26'),
    },

    {
      id: 7,
      name: 'Parces sended',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-08-26'),
    },




  ];




  onBoxClick(event:any){
 console.log('dziala'+event)
 this.notifications = this.notifications.filter(notification => notification.id !== event);
  }


  ngOnInit(): void {
    this.notificationService.currentBoxState.subscribe((state) => {
      this.showBox = state;
      console.log(state)
    });
  }




}
