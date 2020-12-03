import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewsComponent } from './admin-create-news.component';

describe('AdminCreateNewsComponent', () => {
  let component: AdminCreateNewsComponent;
  let fixture: ComponentFixture<AdminCreateNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
