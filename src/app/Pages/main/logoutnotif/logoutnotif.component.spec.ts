import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutnotifComponent } from './logoutnotif.component';

describe('LogoutnotifComponent', () => {
  let component: LogoutnotifComponent;
  let fixture: ComponentFixture<LogoutnotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutnotifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutnotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
