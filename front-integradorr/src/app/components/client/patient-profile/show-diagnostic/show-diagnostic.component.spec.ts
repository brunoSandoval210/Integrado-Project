import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiagnosticComponent } from './show-diagnostic.component';

describe('ShowDiagnosticComponent', () => {
  let component: ShowDiagnosticComponent;
  let fixture: ComponentFixture<ShowDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDiagnosticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
