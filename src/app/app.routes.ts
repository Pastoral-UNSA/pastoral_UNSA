import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Pastoral UNSA',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'registro',
    title: 'Registro Estudiante - Pastoral UNSA',
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'registroCate',
    title: 'Registro Catequista - Pastoral UNSA',
    loadComponent: () => import('./pages/register-cateq/register-cateq.component'),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
