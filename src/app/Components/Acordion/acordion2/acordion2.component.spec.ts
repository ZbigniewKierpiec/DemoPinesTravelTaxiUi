import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acordion2Component } from './acordion2.component';

describe('Acordion2Component', () => {
  let component: Acordion2Component;
  let fixture: ComponentFixture<Acordion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acordion2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acordion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
