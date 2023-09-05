import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Authorization': environment.apiKey,
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
    };
    return this.http.post(`${this.baseUrl}/users/login`, body, {
      headers: this.headers,
    });
  }
  
  register(newUser: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, newUser, {
      headers: this.headers,
    });
  }

}
