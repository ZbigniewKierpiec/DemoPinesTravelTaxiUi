import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpcomingComponent } from './card-upcoming.component';

describe('CardUpcomingComponent', () => {
  let component: CardUpcomingComponent;
  let fixture: ComponentFixture<CardUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpcomingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
