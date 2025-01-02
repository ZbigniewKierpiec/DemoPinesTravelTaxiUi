import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationBoxState = new BehaviorSubject<boolean>(false);
  currentBoxState = this.notificationBoxState.asObservable();

  toggleBoxState() {
    this.notificationBoxState.next(!this.notificationBoxState.value);
  }
}
