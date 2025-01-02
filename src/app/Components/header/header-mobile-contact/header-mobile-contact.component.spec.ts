import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobileContactComponent } from './header-mobile-contact.component';

describe('HeaderMobileContactComponent', () => {
  let component: HeaderMobileContactComponent;
  let fixture: ComponentFixture<HeaderMobileContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMobileContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMobileContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
