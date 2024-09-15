import { UserResponse } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Login } from '../../models/login';
import { Register } from '../../models/register';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    const token = this.getToken();
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  //Methods
  public register(user: Register): Observable<UserResponse> {
    return this.http.post<UserResponse>(environment.apiUrl + 'account/register', user).pipe(
      tap(response => {
        this.setToken(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  public login(user: Login): Observable<UserResponse> {
    return this.http.post<UserResponse>(environment.apiUrl + 'account/login', user).pipe(
      //map((response:UserResponse) => ({username: response.username, token: response.token})),
      tap(response => {
        this.setToken(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  public logout() {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/account/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
  private removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
}
