import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    const token = localStorage.getItem('token'); 
    return this.http.get<Profile>(this.baseUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateProfile(data: Partial<Profile>): Observable<Profile> {
    const token = localStorage.getItem('token');
    return this.http.put<Profile>(this.baseUrl, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

}
