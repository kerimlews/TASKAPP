import { Injectable } from '@angular/core';
import { ERoles } from '../enums/roles.enum';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN = 'token';

  constructor(
    private userService: UserService
  ) { }

  get token(): string {
    return localStorage.getItem(this.TOKEN);
  }

  setToken(value: string) {
    localStorage.setItem(this.TOKEN, value);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN);
  }

  isAuthenticated(): boolean {
    return this.userService.users.some((u: User) => u.id === this.token);
  }

  isAdmin(): boolean {
    return this.userService.users.some((u: User) => u.id === this.token && u.roles.includes(ERoles.Admin));
  }
}
