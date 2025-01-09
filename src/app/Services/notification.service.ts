import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationBoxState = new BehaviorSubject<boolean>(false);
  private profileBoxState = new BehaviorSubject<boolean>(false);
  private sideNavState = new BehaviorSubject<boolean>(false);
  currentBoxState = this.notificationBoxState.asObservable();
  currentProfileState = this.profileBoxState.asObservable();
  currentSideNavState = this.sideNavState.asObservable();
  toggleBoxState() {
    this.notificationBoxState.next(!this.notificationBoxState.value);
  }
  toggleProfileState() {
    this.profileBoxState.next(!this.profileBoxState.value);
  }
  toggleSideNavState() {
    this.sideNavState.next(!this.sideNavState.value);
  }
}
