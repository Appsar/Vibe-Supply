import { effect, Injectable, signal } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartItem } from '../../shared/models/cartitem.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  // Array in localstorage of items put into cart
  private cartList = signal<CartItem[]>(this.loadCart());

  // Updates automaticlly when new item is added to cart list
  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartList()));
    });
  }

  // Function to load the cart from localestorage
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

  //Add a new item to cart and store it in localestorage
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
  // Remove item from cart from localestorage
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
  // clear item fully from cart
  clearItem(product: Product): void {
    this.cartList.update((current) => {
      return current.filter((e) => e.product.id !== product.id);
    });
  }

  // Checks if cart list is empty then return true if it is
  isEmpty(): boolean {
    return this.cartList().length === 0;
  }

  // Function to get the list of items in localestorage
  getCartItems(): CartItem[] {
    return this.cartList();
  }

  // Calculate totalprice in carlist and returns answer
  getTotalPrice(): number {
    return this.cartList().reduce((acc, q) => {
      return acc + q.quantity * q.product.price;
    }, 0);
  }

  // Calculate totalquantity in carlist and returns answer
  getTotalQuantity(): number {
    return this.cartList().reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }
}
