import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailPriceComponent } from './car-detail-price.component';

describe('CarDetailPriceComponent', () => {
  let component: CarDetailPriceComponent;
  let fixture: ComponentFixture<CarDetailPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
