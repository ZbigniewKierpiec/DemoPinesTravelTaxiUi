import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { NotificationService } from '../../../../Services/notification.service';

@Component({
  selector: 'app-dashboard-notyfication-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-notyfication-item.component.html',
  styleUrl: './dashboard-notyfication-item.component.scss',
})
export class DashboardNotyficationItemComponent {
  @Input() message: string | undefined;
  @Input() date: Date | undefined;
  @Input() id: number = 0;
  @Output() boxClicked = new EventEmitter<number>();

  delete() {
    this.boxClicked.emit(this.id);
  }
}
