import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal, PageResponse } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private baseUrl = 'http://localhost:8080/user-api/meals';

  constructor(private http: HttpClient) {}

  getMeals(page = 0, size = 10, search?: string): Observable<PageResponse<Meal>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PageResponse<Meal>>(this.baseUrl, { params });
  }
  addToShoppingList(mealId: number, quantity: number) {

    return this.http.post(
      'http://localhost:8080/user-api/shopping-lists',
      {
        mealIds: [mealId],
        quantity: quantity
      }
    );
  }

}
