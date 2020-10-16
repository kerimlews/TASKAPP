import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERoles } from 'src/app/shared/enums/roles.enum';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.existEmail]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl(ERoles.Standard, [Validators.required])
  });
  roles: string[] = Object.values(ERoles);
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

  existEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      !this.users.some((u: User) => u.email === control.value)
        ? { existEmail: { value: control.value } }
        : null;
  }

  onSubmit() {
    this.error = null;
    const { email, password, role } = this.signupForm.value;
    const existEmail = this.users.some((u: User) => u.email === email);

    if (!existEmail) {
      const id = uuidv4();
      const user = new User(id, email, password, [role]);
      this.userService.save(user);
      this.authService.setToken(id);
      this.router.navigateByUrl('/task');
    } else {
      this.error = 'Email already exists !';
    }
  }
}
