import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsTestComponent } from './cars-test.component';

describe('CarsTestComponent', () => {
  let component: CarsTestComponent;
  let fixture: ComponentFixture<CarsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
