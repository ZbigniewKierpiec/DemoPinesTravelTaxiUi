import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogingWelcomeNotiComponent } from './loging-welcome-noti.component';

describe('LogingWelcomeNotiComponent', () => {
  let component: LogingWelcomeNotiComponent;
  let fixture: ComponentFixture<LogingWelcomeNotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogingWelcomeNotiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogingWelcomeNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
