import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotificationsBoxComponent } from './dashboard-notifications-box.component';

describe('DashboardNotificationsBoxComponent', () => {
  let component: DashboardNotificationsBoxComponent;
  let fixture: ComponentFixture<DashboardNotificationsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNotificationsBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNotificationsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
