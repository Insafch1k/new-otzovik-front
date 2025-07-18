import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'header',
    loadChildren: () =>
      import('./components/header/header.routes').then((m) => m.default),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./components/main/main.routes').then((m) => m.default),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./components/faq/faq.routes').then((m) => m.default),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./components/order-history/order-history.routes').then(
        (m) => m.default
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/register/register.routes').then((m) => m.default),
  },
  {
    path: 'new-passw',
    loadChildren: () =>
      import('./components/new-passw/new-passw.routes').then((m) => m.default),
  },
  {
    path: 'forgot-passw',
    loadChildren: () =>
      import('./components/forgot-passw/forgot-passw.routes').then(
        (m) => m.default
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/profile/profile.routes').then((m) => m.default),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.routes').then((m) => m.default),
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

export const routes = APP_ROUTES;
