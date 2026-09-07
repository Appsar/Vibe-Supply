import { Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';

import { ProductDetail } from './features/products/product-detail/product-detail';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductList },
  { path: 'products/:id', component: ProductDetail },
];
