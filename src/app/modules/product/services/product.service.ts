import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

  products: Product[] = [];

  findProductsByUser(userId: number): Product[] {
    return [];
  }

  addPoduct(): void {

  }

  findProductByid(): Product {
    return {
      
    }
  }

  delteProduct(): void {

  }

  constructor() { }
}
