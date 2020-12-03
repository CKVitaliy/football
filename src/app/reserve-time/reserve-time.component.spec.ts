import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTimeComponent } from './reserve-time.component';

describe('ReserveTimeComponent', () => {
  let component: ReserveTimeComponent;
  let fixture: ComponentFixture<ReserveTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
