import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../products';
import { Product } from '../../../shared/models/product.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private productService = inject(ProductsService);
  products = signal<Product[]>([]);
  cartService = inject(CartService);
  searchTerm = signal('');

  filteredProducts = computed(() => {
    return this.products().filter((e) =>
      e.name.toLowerCase().includes(this.searchTerm().toLowerCase()),
    );
  });

  private route = inject(ActivatedRoute);

  generateSlug(name: string): string {
    return name.toLowerCase().replace(/ /g, '-');
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to load products', err),
    });

    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm.set(params.get('search') ?? '');
    });
  }
}
