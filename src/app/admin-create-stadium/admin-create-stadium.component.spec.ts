import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateStadiumComponent } from './admin-create-stadium.component';

describe('AdminCreateStadiumComponent', () => {
  let component: AdminCreateStadiumComponent;
  let fixture: ComponentFixture<AdminCreateStadiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateStadiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
