import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportTransferComponentComponent } from './airport-transfer-component.component';

describe('AirportTransferComponentComponent', () => {
  let component: AirportTransferComponentComponent;
  let fixture: ComponentFixture<AirportTransferComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportTransferComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportTransferComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
