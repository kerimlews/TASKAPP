import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ERoles } from './shared/enums/roles.enum';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initiateUsers();
  }

  initiateUsers() {
    const email = 'admin@maus.ba';

    if (this.userService.findByEmail(email)) { return; }

    const id = uuidv4();
    const password = 'Testpass1';
    const roles = [ERoles.Admin];

    const user = new User(id, email, password, roles);

    localStorage.setItem('users', JSON.stringify([user]));
  }

}
