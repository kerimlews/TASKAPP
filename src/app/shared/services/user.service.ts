import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  get users(): User[] {
    const allUsers = localStorage.getItem('users');
    return allUsers ? JSON.parse(allUsers) : [];
  }

  findByEmail(email: string) {
    return this.users.find((user: User) => user.email === email);
  }

  save(user: User) {
    const allUsers = [...this.users, user];
    localStorage.setItem('users', JSON.stringify(allUsers));
  }
}
