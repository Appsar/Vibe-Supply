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

  // For add to cart button to match id for right button
  justAddedId = signal<number | string | null>(null);

  //When pressing on add to cart adds one item to cart and also changes the button name for a secound to added for feedback for use
  onAddToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
    this.justAddedId.set(product.id);
    setTimeout(() => this.justAddedId.set(null), 1300);
  }
  // Generate a slug name when navigating to detail page
  slug(name: string) {
    return generateSlug(name);
  }
  // Utility function to check if an added item is added within 7 days
  isNew(created_at: string) {
    return dateCheck(created_at);
  }

  // Gets all products from database and store in signal
  ngOnInit(): void {
    this.productsService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to load products', err),
    });
  }
}
