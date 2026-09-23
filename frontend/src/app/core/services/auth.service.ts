import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private tokenKey = 'auth_token';
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth/login';

  isLoggedIn = signal<boolean>(!!localStorage.getItem(this.tokenKey));

  // Login for user with right email and password
  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}`, { email, password });
  }

  // Sets login token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedIn.set(true);
  }

  // Gets token from localstorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Logout for user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
