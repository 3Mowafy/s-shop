import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormHeaderComponent } from './admin-form-header.component';

describe('AdminFormHeaderComponent', () => {
  let component: AdminFormHeaderComponent;
  let fixture: ComponentFixture<AdminFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
