import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../products';
import { Product } from '../../../shared/models/product.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { generateSlug } from '../../../shared/utility/slug';
import { MobileMenuService } from '../../../core/services/mobile-menu.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private productService = inject(ProductsService); // Product service to use CRUD
  products = signal<Product[]>([]); //All products gatherted from backend
  cartService = inject(CartService); //Add products to cart
  searchTerm = signal(''); //Search input signal
  menuService = inject(MobileMenuService); // For mobile menu to toggle

  justAddedId = signal<number | string | null>(null);

  //When pressing on add to cart adds one item to cart and also changes the button name for a secound to added for feedback for use
  onAddToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
    this.justAddedId.set(product.id);
    setTimeout(() => this.justAddedId.set(null), 1300);
  }

  // Generate slug when navigating to detail page
  slug(name: string) {
    return generateSlug(name);
  }

  // Filters product based on the search input in navbar. If serach includes and product title name it is included in Filterdproducts and displayed otherwise display all prodcuts
  filteredProducts = computed(() => {
    return this.products().filter((e) =>
      e.name.toLowerCase().includes(this.searchTerm().toLowerCase()),
    );
  });

  private route = inject(ActivatedRoute);

  //Get all products form database and display
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
