import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedBorderBtnComponent } from './animated-border-btn.component';

describe('AnimatedBorderBtnComponent', () => {
  let component: AnimatedBorderBtnComponent;
  let fixture: ComponentFixture<AnimatedBorderBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedBorderBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedBorderBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
