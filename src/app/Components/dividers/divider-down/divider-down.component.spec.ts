import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerDownComponent } from './divider-down.component';

describe('DividerDownComponent', () => {
  let component: DividerDownComponent;
  let fixture: ComponentFixture<DividerDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividerDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
