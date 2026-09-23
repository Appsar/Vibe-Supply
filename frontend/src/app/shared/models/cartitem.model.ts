import { Product } from './product.model';

// Model for CartItem with product form Product Model and quantity
export interface CartItem {
  product: Product;
  quantity: number;
}
