import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbpardTestComponent } from './dashbpard-test.component';

describe('DashbpardTestComponent', () => {
  let component: DashbpardTestComponent;
  let fixture: ComponentFixture<DashbpardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbpardTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbpardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
