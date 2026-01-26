import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedMealsComponent } from './approved-meals.component';

describe('ApprovedMealsComponent', () => {
  let component: ApprovedMealsComponent;
  let fixture: ComponentFixture<ApprovedMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedMealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
