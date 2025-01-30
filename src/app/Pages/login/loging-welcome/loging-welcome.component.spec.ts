import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogingWelcomeComponent } from './loging-welcome.component';

describe('LogingWelcomeComponent', () => {
  let component: LogingWelcomeComponent;
  let fixture: ComponentFixture<LogingWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogingWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogingWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
