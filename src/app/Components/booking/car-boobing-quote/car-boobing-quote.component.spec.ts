import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBoobingQuoteComponent } from './car-boobing-quote.component';

describe('CarBoobingQuoteComponent', () => {
  let component: CarBoobingQuoteComponent;
  let fixture: ComponentFixture<CarBoobingQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarBoobingQuoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarBoobingQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
