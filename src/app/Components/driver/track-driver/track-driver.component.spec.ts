import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDriverComponent } from './track-driver.component';

describe('TrackDriverComponent', () => {
  let component: TrackDriverComponent;
  let fixture: ComponentFixture<TrackDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
