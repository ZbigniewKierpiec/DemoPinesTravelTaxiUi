import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHamburgerComponent } from './dashboard-hamburger.component';

describe('DashboardHamburgerComponent', () => {
  let component: DashboardHamburgerComponent;
  let fixture: ComponentFixture<DashboardHamburgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHamburgerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
