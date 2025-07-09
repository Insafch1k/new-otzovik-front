import { Routes } from '@angular/router';
import { FaqComponent } from './components/faq/faq.component';
import { RegisterComponent } from './components/registr/register.component';
import { AuthComponent } from './components/auth/auth.component';
import { NewPasswComponent } from './components/new-passw/new-passw.component';
import { ForgotPasswComponent } from './components/forgot-passw/forgot-passw.component';
import { ProfileComponent } from './components/profile/profile.component';

export const APP_ROUTES: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: '', redirectTo: 'faq', pathMatch: 'full' },
  { path: 'orders', component: FaqComponent }, // Временно используем FaqComponent
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'new-passw', component: NewPasswComponent },
  { path: 'forgot-passw', component: ForgotPasswComponent },
  { path: 'profile', component: ProfileComponent },

];

export const routes = APP_ROUTES;
