import { Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';

import { ProductDetail } from './features/products/product-detail/product-detail';
import { Home } from './features/home/home';
import { Userpage } from './features/userpage/userpage';
import { Cart } from './features/cart/cart';
import { Login } from './features/login/login';
import { authGuard } from './core/guards/auth.guard';
import { Checkout } from './features/checkout/checkout';
import { Admin } from './features/admin/admin';
import { AdminNew } from './features/admin/admin-new/admin-new';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductList },
  { path: 'products/:id', component: ProductDetail },
  { path: 'products/:id', component: ProductDetail },
  { path: 'user', component: Userpage, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'admin', component: Admin, canActivate: [authGuard] },
  { path: 'admin/new', component: AdminNew, canActivate: [authGuard] },
];
