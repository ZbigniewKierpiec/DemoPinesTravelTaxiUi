import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullScreenService {
  constructor() {}

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }






  private notificationCount = new BehaviorSubject<number>(0); // Initial count
  notificationCount$ = this.notificationCount.asObservable(); // Observable to subscribe to

  updateNotificationCount(count: number): void {
    this.notificationCount.next(count); // Update the count
  }










}
