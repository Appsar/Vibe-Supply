import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../products/products';
import { Product } from '../../shared/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductList } from '../products/product-list/product-list';
import { generateSlug } from '../../shared/utility/slug';
import { dateCheck } from '../../shared/utility/dateCheck';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  productsService = inject(ProductsService);
  products = signal<Product[]>([]);
  cartService = inject(CartService);

  justAddedId = signal<number | string | null>(null);

  onAddToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
    this.justAddedId.set(product.id);
    setTimeout(() => this.justAddedId.set(null), 1300);
  }

  slug(name: string) {
    return generateSlug(name);
  }

  isNew(created_at: string) {
    return dateCheck(created_at);
  }

  ngOnInit(): void {
    this.productsService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to load products', err),
    });
  }
}
