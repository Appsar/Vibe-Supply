import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ProductsService } from '../products';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product = signal<Product | null>(null);

  private route = inject(ActivatedRoute);

  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = parseInt((params.get('id') as string) || '', 10);
      this.productService.getById(id).subscribe((data) => this.product.set(data));
    });
  }
}
