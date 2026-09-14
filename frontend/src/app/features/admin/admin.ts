import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../products/products';
import { Product } from '../../shared/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  productService = inject(ProductsService);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to load products', err),
    });
  }
}
