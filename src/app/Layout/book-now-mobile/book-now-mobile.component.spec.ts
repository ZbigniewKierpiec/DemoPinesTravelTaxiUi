import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNowMobileComponent } from './book-now-mobile.component';

describe('BookNowMobileComponent', () => {
  let component: BookNowMobileComponent;
  let fixture: ComponentFixture<BookNowMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNowMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookNowMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
