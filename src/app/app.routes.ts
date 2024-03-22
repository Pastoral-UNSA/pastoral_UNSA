import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    // children: [
    //   {
    //     path: 'change-page',
    //     title: 'ChangePage',
    //     loadComponent: () => import('./login/login.component'),
    //   },
    // ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
