import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminGuardService } from './shared/services/admin-guard.service';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'task',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule)
  },
  {
    path: 'task/create',
    canActivate: [AdminGuardService],
    loadChildren: () => import('./pages/create-task/create-task.module').then(m => m.CreateTaskModule)
  },
  {
    path: 'task/edit/:id',
    canActivate: [AdminGuardService],
    loadChildren: () => import('./pages/edit-task/edit-task.module').then(m => m.EditTaskModule)
  },
  {
    path: '',
    redirectTo: '/task',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
