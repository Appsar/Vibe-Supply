import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../products/products';
import { Product } from '../../shared/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { generateSlug } from '../../shared/utility/slug';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  productService = inject(ProductsService);
  products = signal<Product[]>([]);

  //Generate slug when navigating to detail page
  slug(name: string) {
    return generateSlug(name);
  }

  // Deletes product fully from front and backend
  onDelete(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => {
        this.products.update((current) => current.filter((e) => e.id !== id));
      },
      error: (err) => console.error('Failed to delete product', err),
    });
  }

  // Get all products and store them in signal for render on page
  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to load products', err),
    });
  }
}
