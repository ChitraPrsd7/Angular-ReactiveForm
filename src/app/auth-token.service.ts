import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private authToken: string | null = null;

  constructor( ) { }

  setToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token); // Store in local storage
  }

  getToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }
}