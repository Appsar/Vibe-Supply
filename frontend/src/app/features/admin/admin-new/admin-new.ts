import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../products/products';
import { Product } from '../../../shared/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-new',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-new.html',
  styleUrl: './admin-new.css',
})
export class AdminNew {
  productService = inject(ProductsService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);

  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image_url: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    const { name, image_url, description, price, stock, sku } = this.addProductForm.value;
    if (!name || !image_url) return;

    const newProduct: Partial<Product> = {
      name,
      image_url,
      description: description ?? '',
      price: Number(price),
      stock: Number(stock),
      sku: sku ?? '',
    };

    this.productService.create(newProduct).subscribe({
      next: (createdProduct) => {
        this.router.navigate(['/admin']);
      },
      error: (err) => console.error('Failed to create product', err),
    });
  }
}
