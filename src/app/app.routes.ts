import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    
  },
  {
    path: 'asistencias',
    loadComponent: () => import('./pages/assistance/assistance.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin/admin.component'),
    children: [
      {
        path: 'coro',
        title: 'Coro - Pastoral UNSA',
        loadComponent: () => import('./admin/pages/choir/choir.component'),
      },
      {
        path: 'tallerOracion',
        title: 'Taller de Oracion - Pastoral UNSA',
        loadComponent: () => import('./admin/pages/prayer/prayer.component'),
      },
      {
        path: 'sacramentos',
        title: 'Sacramentos - Pastoral UNSA',
        loadComponent: () => import('./admin/pages/sacraments/sacraments.component'),
      },
      {
        path: 'voluntariado',
        title: 'Voluntariado - Pastoral UNSA',
        loadComponent: () => import('./admin/pages/volunteering/volunteering.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
];
