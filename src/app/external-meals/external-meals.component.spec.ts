import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalMealsComponent } from './external-meals.component';

describe('ExternalMealsComponent', () => {
  let component: ExternalMealsComponent;
  let fixture: ComponentFixture<ExternalMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalMealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
