import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CTodo, Todo } from '../models/todo';
import { environment } from '../../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  constructor() { }

  public getTodos(): Observable<Todo[]> {
    return this.http.get<any>(environment.apiUrl + `todo/todos`).pipe(
      map(response => response.data));
  }
  public getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(environment.apiUrl + `todo/todo/${id}`);
  }
  public createTodo(todo: CTodo): Observable<Todo> {
    return this.http.post<Todo>(environment.apiUrl + `todo/todo`, todo);
  }
  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(environment.apiUrl + `todo/todo`, todo);
  }
  public deleteTodo(id: number, username: string): Observable<Todo> {
    return this.http.delete<Todo>(environment.apiUrl + `todo/todo`, { body: {id, username}});
  }
}
