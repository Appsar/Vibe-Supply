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

  // Form Group for adding new product to backend, validation on all inputs
  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    image_url: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  // Error handeling for form if missing input
  hasError(controlName: string, errorName: string): boolean {
    const control = this.addProductForm.get(controlName);
    return !!(control && control.hasError(errorName) && control.touched);
  }

  // When submiting form checks validation and all of the inputs are there then push the product into backend database
  onSubmit(): void {
    const { name, image_url, description, price, stock, sku } = this.addProductForm.value;
    if (!name || !image_url || !description || !price || !stock || !sku) return;

    const newProduct: Partial<Product> = {
      name,
      image_url,
      description: description ?? '',
      price: Number(price),
      stock: Number(stock),
      sku: sku ?? '',
    };

    this.productService.create(newProduct).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: (err) => console.error('Failed to create product', err),
    });
  }
}
