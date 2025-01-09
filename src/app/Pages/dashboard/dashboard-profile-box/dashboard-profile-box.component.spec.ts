import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfileBoxComponent } from './dashboard-profile-box.component';

describe('DashboardProfileBoxComponent', () => {
  let component: DashboardProfileBoxComponent;
  let fixture: ComponentFixture<DashboardProfileBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProfileBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProfileBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
