import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageItemComponent } from './user-page-item.component';

describe('UserPageItemComponent', () => {
  let component: UserPageItemComponent;
  let fixture: ComponentFixture<UserPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPageItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
