import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotyficationItemComponent } from './dashboard-notyfication-item.component';

describe('DashboardNotyficationItemComponent', () => {
  let component: DashboardNotyficationItemComponent;
  let fixture: ComponentFixture<DashboardNotyficationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNotyficationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNotyficationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
