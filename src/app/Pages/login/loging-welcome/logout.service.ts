import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private logOutSubject = new BehaviorSubject<boolean>(false); // Przechowuje aktualny stan
  logOut$ = this.logOutSubject.asObservable();

  logOut() {
    this.logOutSubject.next(true); // Powiadamiamy o wylogowaniu

    // Po krótkim czasie resetujemy wartość, by nie triggerować ponownie
    setTimeout(() => {
      this.logOutSubject.next(false);
    }, 1000);
  }




}
