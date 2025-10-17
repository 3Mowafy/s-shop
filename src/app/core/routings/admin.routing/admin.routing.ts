import { Routes } from '@angular/router';

import { AdminComponent } from '@layouts/admin/admin.component';
import { brandsAdminRoutes } from './brands.routing';
import { productsRoutes } from './product.routing';
import { categoriesRoutes } from './categories.routing';
import { roleGuard } from 'core/guards/role.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [roleGuard],
    children: [...brandsAdminRoutes, ...productsRoutes, ...categoriesRoutes],
  },
];
