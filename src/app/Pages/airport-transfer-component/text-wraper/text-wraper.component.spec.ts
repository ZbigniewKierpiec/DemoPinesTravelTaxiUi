import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWraperComponent } from './text-wraper.component';

describe('TextWraperComponent', () => {
  let component: TextWraperComponent;
  let fixture: ComponentFixture<TextWraperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWraperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextWraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
