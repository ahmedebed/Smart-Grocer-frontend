import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse, ShoppingItem } from '../models/shopping-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private baseUrl = 'http://localhost:8080/user-api/shopping-lists';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 10): Observable<PageResponse<ShoppingItem>> {
    return this.http.get<PageResponse<ShoppingItem>>(
      `${this.baseUrl}?page=${page}&size=${size}`
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
