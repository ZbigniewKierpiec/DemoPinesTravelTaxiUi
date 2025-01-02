import { Component } from '@angular/core';
import { ScrollDirective } from '../../../Directives/scroll.directive';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ScrollDirective],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

}
