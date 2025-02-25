import { EventEmitter, Injectable } from '@angular/core';
import { LoginRequest } from '../Models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../Models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { User } from '../Models/user.model';
import { CookieService } from 'ngx-cookie-service';
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;

  email: string;
  createdAt: Date;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);
 // Tworzymy EventEmitter do przesyłania zdarzeń
//  public logOutEvent: EventEmitter<void> = new EventEmitter<void>();
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/Auth/login`,
      {
        email: request.email,
        password: request.password,
      }
    );
  }

  ///////////////////////Register/////////////////////////////////

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.apiBaseUrl}/api/Auth/register`,
      {
        email: request.email,
        password: request.password,
      }
    );
  }

  ///////////////////////////////////////////////////////////////
  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles?.split(','),
      };
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
    sessionStorage.clear();
  }
}
