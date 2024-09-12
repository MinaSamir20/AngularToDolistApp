import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CTodo, Todo } from '../models/todo';
import { environment } from '../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  constructor() { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'  // Add content-type header if needed
    });
  }

  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyIiwianRpIjoiNzQzOGE3N2QtMDNiZi00YTAyLWJhNWQtZmM5ZDkxZjIzMTliIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwidWlkIjoiMSIsInJvbGVzIjoiVXNlciIsImV4cCI6MTcyODcxNzQwMSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.Y75kT20x4VlLQTu8dT6-wLY_0DR3nkrxcIIQ8Du3et8';

  public getTodos(): Observable<Todo[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(environment.apiUrl + `todo/todos`, { headers }).pipe(
      map(response => response.data));
  }
  public getTodo(id: number): Observable<Todo> {
    const headers = this.getHeaders();
    return this.http.get<Todo>(environment.apiUrl + `todo/todo/${id}`, { headers });
  }
  public createTodo(todo: CTodo): Observable<Todo> {
    const headers = this.getHeaders();
    return this.http.post<Todo>(environment.apiUrl + `todo/todo`, todo, { headers });
  }
  public updateTodo(todo: Todo): Observable<Todo> {
    const headers = this.getHeaders();
    return this.http.put<Todo>(environment.apiUrl + `todo/todo`, todo, { headers});
  }
  public deleteTodo(id: number, username: string): Observable<Todo> {
    const headers = this.getHeaders();
    return this.http.delete<Todo>(environment.apiUrl + `todo/todo`, { headers, body: {id, username}});
  }
}
