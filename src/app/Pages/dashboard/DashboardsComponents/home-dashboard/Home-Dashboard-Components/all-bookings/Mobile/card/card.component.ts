import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookingStatus } from '../../../upcoming-bookings/upcoming-bookings.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() item: any;



// Getter for booking status


getBookingStatus(status: any): string {
  switch (status) {
    case BookingStatus.Pending:
      return '⏳ Pending';
    case BookingStatus.Confirmed:
      return '✅ Confirmed';
    case BookingStatus.Cancelled:
      return '❌ Cancelled';
    case BookingStatus.Completed:
      return '🏁 Completed';
    case BookingStatus.Rejected:
      return '❌ Rejected';
    case BookingStatus.InProgress:
      return '🚗 In Progress';
    case BookingStatus.AwaitingPayment:
      return '💳 Awaiting Payment';
    case BookingStatus.Failed:
      return '⚠️ Failed';
    default:
      return '❓ Unknown';
  }
}




}
