import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDashboardNotyficationComponent } from './home-dashboard-notyfication.component';

describe('HomeDashboardNotyficationComponent', () => {
  let component: HomeDashboardNotyficationComponent;
  let fixture: ComponentFixture<HomeDashboardNotyficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDashboardNotyficationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDashboardNotyficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
