import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinglistDashboardComponent } from './bookinglist-dashboard.component';

describe('BookinglistDashboardComponent', () => {
  let component: BookinglistDashboardComponent;
  let fixture: ComponentFixture<BookinglistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookinglistDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookinglistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
