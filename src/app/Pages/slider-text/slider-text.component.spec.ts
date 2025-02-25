import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTextComponent } from './slider-text.component';

describe('SliderTextComponent', () => {
  let component: SliderTextComponent;
  let fixture: ComponentFixture<SliderTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
