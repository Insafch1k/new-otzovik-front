import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'faq',
    loadChildren: () => import('./components/faq/faq.routes').then(m => m.default)
  },
  {
    path: 'orders',
    loadChildren: () => import('./components/order-history/order-history.routes').then(m => m.default)
  },
  {
    path: 'register',
    loadChildren: () => import('./components/registr/register.routes').then(m => m.default)
  },
  {
    path: 'new-passw',
    loadChildren: () => import('./components/new-passw/new-passw.routes').then(m => m.default)
  },
  {
    path: 'forgot-passw',
    loadChildren: () => import('./components/forgot-passw/forgot-passw.routes').then(m => m.default)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.routes').then(m => m.default)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes').then(m => m.default)
  },
  { path: '', redirectTo: 'faq', pathMatch: 'full' },

];

export const routes = APP_ROUTES;
