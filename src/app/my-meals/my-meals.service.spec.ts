import { TestBed } from '@angular/core/testing';

import { MyMealsService } from './my-meals.service';

describe('MyMealsService', () => {
  let service: MyMealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
