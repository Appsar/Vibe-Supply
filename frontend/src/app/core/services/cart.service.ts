import { effect, Injectable, signal } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartItem } from '../../shared/models/cartitem.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartList = signal<CartItem[]>(this.loadCart());

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartList()));
    });
  }

  loadCart() {
    const savedCart = localStorage.getItem('cart');

    if (!savedCart) return [];
    try {
      return JSON.parse(savedCart) as CartItem[];
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
      return [];
    }
  }

  addToCart(product: Product, quantity: number): void {
    this.cartList.update((currentItems) => {
      const exist = currentItems.find((i) => i.product.id === product.id);
      if (exist) {
        return currentItems.map((e) =>
          e.product.id === product.id ? { ...e, quantity: e.quantity + quantity } : e,
        );
      } else {
        return [...currentItems, { product, quantity }];
      }
    });
  }

  removeFromCart(product: Product, quantity: number): void {
    this.cartList.update((currentItems) => {
      return currentItems
        .map((e) =>
          e.product.id === product.id && e.quantity > 0
            ? { ...e, quantity: e.quantity - quantity }
            : e,
        )
        .filter((f) => f.quantity !== 0);
    });
  }

  getCartItems(): CartItem[] {
    return this.cartList();
  }

  getTotalPrice(): number {
    return this.cartList().reduce((acc, q) => {
      return acc + q.quantity * q.product.price;
    }, 0);
  }

  getTotalQuantity(): number {
    return this.cartList().reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }
}
