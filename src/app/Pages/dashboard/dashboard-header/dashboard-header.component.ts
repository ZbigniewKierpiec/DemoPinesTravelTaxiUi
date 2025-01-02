import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { HamburgerComponent } from '../../../Components/hamburger/hamburger.component';
import { DashboardHamburgerComponent } from './dashboard-hamburger/dashboard-hamburger.component';
import { FullScreenService } from '../../../Services/full-screen.service';
import { DashboardNotyficationItemComponent } from './dashboard-notyfication-item/dashboard-notyfication-item.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../Services/notification.service';

export interface Notification {
  id: number;
  name: string;
  message: string;
  date: Date;
}
@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    DashboardHamburgerComponent,
    DashboardNotyficationItemComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent implements OnInit {
  modeActive: boolean = false;
  fullScreenMode: boolean = false;
  notificationCount: number = 0;
  constructor(
    private FullScreenService: FullScreenService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.FullScreenService.updateNotificationCount(this.notifications.length);
    this.FullScreenService.notificationCount$.subscribe((count) => {
      this.notificationCount = count;
    });
  }

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

  onBoxClick(event: any) {
    console.log('dziala' + event);
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== event
    );
    this.FullScreenService.updateNotificationCount(this.notifications.length);
  }

  onModeChange(): void {
    this.modeActive = !this.modeActive;
  }

  toggleFullScreen() {
    // this.FullScreenService.toggleFullScreen();
    this.fullScreenMode = !this.fullScreenMode;
    this.FullScreenService.toggleFullScreen();
  }

  toogleNotyficationsBox() {
    this.notificationService.toggleBoxState();
  }
}
