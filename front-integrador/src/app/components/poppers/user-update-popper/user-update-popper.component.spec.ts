import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatePopperComponent } from './user-update-popper.component';

describe('UserUpdatePopperComponent', () => {
  let component: UserUpdatePopperComponent;
  let fixture: ComponentFixture<UserUpdatePopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpdatePopperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdatePopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
