import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  error: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/task');
    }
  }

  get users(): User[] { return this.userService.users; }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    const user = this.users.find((u: User) => u.email === email);
    const isValidPassword = user && user.password === password;

    if (user && isValidPassword) {
      this.authService.setToken(user.id);
      this.router.navigateByUrl('/task');
      return;
    }

    if (!user) {
      this.error = 'Email is not valid !';
    } else {
      this.error = 'Password is not valid !';
    }
  }
}
