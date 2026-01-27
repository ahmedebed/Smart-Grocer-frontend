import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExternalMealsService {
  private readonly BASE_URL = 'http://localhost:8080/admin-api/meals';

  constructor(private http: HttpClient) {}

  getMeals(page: number, size: number, searchTerm?: string): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (searchTerm && searchTerm.trim()) {
      params = params.set('name', searchTerm).set('category', searchTerm);
    }

    return this.http.get<any>(this.BASE_URL, { params });
  }
  toggleApprove(mealId: string) {
    return this.http.post<any>(
      `${this.BASE_URL}/${mealId}/toggle-approved`,
      {}
    );
  }
}
