import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingsListComponent } from './edit-bookings-list.component';

describe('EditBookingsListComponent', () => {
  let component: EditBookingsListComponent;
  let fixture: ComponentFixture<EditBookingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookingsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
