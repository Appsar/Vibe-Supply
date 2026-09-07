import { Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';
import { App } from './app';

export const routes: Routes = [
  { path: '*', component: App },
  { path: 'products', component: ProductList },
];
