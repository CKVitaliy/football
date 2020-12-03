import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditStadiumComponent } from './admin-edit-stadium.component';

describe('AdminEditStadiumComponent', () => {
  let component: AdminEditStadiumComponent;
  let fixture: ComponentFixture<AdminEditStadiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditStadiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
