import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletorUserComponent } from './skeletor-user.component';

describe('SkeletorUserComponent', () => {
  let component: SkeletorUserComponent;
  let fixture: ComponentFixture<SkeletorUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletorUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
