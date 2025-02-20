import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSnackbarFaildComponent } from './customer-snackbar-faild.component';

describe('CustomerSnackbarFaildComponent', () => {
  let component: CustomerSnackbarFaildComponent;
  let fixture: ComponentFixture<CustomerSnackbarFaildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSnackbarFaildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSnackbarFaildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
