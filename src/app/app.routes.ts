import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full'
  },
  {
    path: 'account/login',
    loadComponent: () => import('./pages/core/components/auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'account/register',
    loadComponent: () => import('./pages/core/components/auth/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'todo',
    loadComponent: () => import('./pages/core/components/todo/components/todo-list/todo-list.component').then(m => m.TodoListComponent)
  },
  {
    path: '**',
    redirectTo: 'account/login',
    pathMatch: 'full'
  }
];
