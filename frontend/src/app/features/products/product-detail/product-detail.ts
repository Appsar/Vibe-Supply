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

  productListScroll = signal<Product[]>([]);

  currentIndex = signal(0);

  limitedProducts = computed(() => this.productListScroll().slice(0, 6));

  visableProducts = computed(() => {
    return this.productListScroll().slice(this.currentIndex(), this.currentIndex() + 3);
  });

  goNext = computed(() => this.currentIndex() + 3 < this.limitedProducts().length);
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

  slug(name: string) {
    return generateSlug(name);
  }

  private route = inject(ActivatedRoute);

  private productService = inject(ProductsService);

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
