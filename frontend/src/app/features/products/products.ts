import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products';

  //Gets all products from database
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  //Get singular product from database based on id in params
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Creates a new product to add to database. Need product object from parameters to create product in backend
  create(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  //Deletes product based on id in params
  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
