import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTestComponent } from './header-test.component';

describe('HeaderTestComponent', () => {
  let component: HeaderTestComponent;
  let fixture: ComponentFixture<HeaderTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
