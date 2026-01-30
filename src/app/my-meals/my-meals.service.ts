import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyMealsService {

  private readonly BASE_URL = 'http://localhost:8080/admin-api/meals';

  constructor(private http: HttpClient) {}

  getMeals(page: number, size: number, search?: string) {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<any>(`${this.BASE_URL}/internal`, { params });
  }



  toggleApprove(externalId: string): Observable<any> {
    return this.http.post<any>(
      `${this.BASE_URL}/${externalId}/toggle-approved`,
      {}
    );
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE_URL}/${id}`
    );
  }
}
