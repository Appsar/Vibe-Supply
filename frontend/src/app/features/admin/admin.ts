import { Component, effect, inject, signal } from '@angular/core';
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

  onDelete(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => {
        this.products.update((current) => current.filter((e) => e.id !== id));
      },
      error: (err) => console.error('Failed to delete product', err),
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to load products', err),
    });
  }
}
