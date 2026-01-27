import { TestBed } from '@angular/core/testing';

import { ExternalMealsService } from './external-meals.service';

describe('ExternalMealsService', () => {
  let service: ExternalMealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalMealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
