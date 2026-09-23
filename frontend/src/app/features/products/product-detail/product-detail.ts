import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ProductsService } from '../products';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { MobileMenuService } from '../../../core/services/mobile-menu.service';
import { generateSlug } from '../../../shared/utility/slug';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product = signal<Product | null>(null);
  cartService = inject(CartService);
  menuService = inject(MobileMenuService);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  productListScroll = signal<Product[]>([]);

  justAddedId = signal<number | string | null>(null);
  //When pressing on add to cart adds one item to cart and also changes the button name for a secound to added for feedback for use
  onAddToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
    this.justAddedId.set(product.id);
    setTimeout(() => this.justAddedId.set(null), 1300);
  }

  // Base index for item scroll
  currentIndex = signal(0);

  // Limits item for item scroll to 6
  limitedProducts = computed(() => this.productListScroll().slice(0, 6));

  //Limits item to show 3 at a time
  visableProducts = computed(() => {
    return this.productListScroll().slice(this.currentIndex(), this.currentIndex() + 3);
  });

  // next and prev are functions to navigate left or right in item scroll carasouel on detail page
  goNext = computed(() => this.currentIndex() + 1 < this.limitedProducts().length);
  goPrev = computed(() => this.currentIndex() > 0);

  next(): void {
    if (this.goNext()) {
      this.currentIndex.update((i) => i + 1);
    }
  }

  prev(): void {
    if (this.goPrev()) {
      this.currentIndex.update((i) => i - 1);
    }
  }

  // Generate slug for navigating to detail page
  slug(name: string) {
    return generateSlug(name);
  }

  // Get right product to display based on url params id
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = parseInt((params.get('id') as string) || '', 10);
      this.productService.getById(id).subscribe((data) => this.product.set(data));
    });
    this.productService.getAll().subscribe({
      next: (data) => this.productListScroll.set(data),
      error: (err) => console.error('Failed to load products', err),
    });
  }
}
