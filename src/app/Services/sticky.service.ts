import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StickyService {
  private isStickySubject = new BehaviorSubject<boolean>(false);
  isSticky$ = this.isStickySubject.asObservable();

  setSticky(value: boolean) {
    this.isStickySubject.next(value);
  }

}
