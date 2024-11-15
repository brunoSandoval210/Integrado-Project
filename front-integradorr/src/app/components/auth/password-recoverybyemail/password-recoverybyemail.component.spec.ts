import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoverybyemailComponent } from './password-recoverybyemail.component';

describe('PasswordRecoverybyemailComponent', () => {
  let component: PasswordRecoverybyemailComponent;
  let fixture: ComponentFixture<PasswordRecoverybyemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordRecoverybyemailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRecoverybyemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
