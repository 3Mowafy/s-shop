import { Routes } from '@angular/router';

import { HomeComponent } from '@layouts/home/home.component';
import { SuccessComponent, NotfoundPageComponent } from '@ui';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page | S-shop',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('core/routings/auth.routing').then((r) => r.authRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('core/routings/admin.routing/admin.routing').then(
        (r) => r.adminRoutes
      ),
  },
  {
    path: 'success',
    component: SuccessComponent,
    title: 'Success Page | S-shop',
  },
  {
    path: '**',
    component: NotfoundPageComponent,
    title: '404 Not Found | S-shop',
  },
];
