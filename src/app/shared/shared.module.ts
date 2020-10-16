import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    TaskService,
    UserService
  ],
  exports: [
    NavigationComponent
  ]
})
export class SharedModule { }
