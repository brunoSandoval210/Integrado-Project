import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesUserComponent } from './schedules-user.component';

describe('SchedulesUserComponent', () => {
  let component: SchedulesUserComponent;
  let fixture: ComponentFixture<SchedulesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
