import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from '../../models/login';
import { Register } from '../../models/register';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //
  private authTokenKey = 'authToken';
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
  public register(user: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'account/register', user).pipe(
      tap(response => {
        this.setToken(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  public login(user: Login): Observable<any> {
    return this.http.post<{ token: string }>(environment.apiUrl + 'account/login', user).pipe(
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
