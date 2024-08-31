import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideUserComponent } from './slide-user.component';

describe('SlideUserComponent', () => {
  let component: SlideUserComponent;
  let fixture: ComponentFixture<SlideUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
