import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';
import { AddProduct } from '../models/add-product';
import { AddProductResponse } from '../models/implementation/AddProductResponse';
import { FlashMessageService } from 'src/app/services/flash-message.service';

import { environment } from 'src/environments/environment';
import endPointsApi from 'src/app/utils/endPointsApi';

@Injectable()
export class ProductService {

  private baseUrl: string = environment.domain + environment.api;
  
  products: Product[] = [];

  constructor(
    private http: HttpClient,
    private flashMessageService: FlashMessageService) {}

  findProductsByUser(userId: number): Product[] {
    return [];
  }

  addPoduct(product: AddProduct):Observable<AddProductResponse | boolean> {
    const productFormData = new FormData();

    productFormData.append('file', product.file);
    productFormData.append('productOpenDate', product.productOpenDate.toString());
    productFormData.append('productEndDate', product.productEndDate.toString());

    return this.http.post<AddProductResponse>(this.baseUrl + endPointsApi.addProduct.url, productFormData).pipe(
      tap(res=>{
        this.flashMessageService.updateFlashMessage({
          isError: false,
          message: res.message
        })
      }), 
      catchError(() => {
        return of(false);
      })
    )
    

  }

  findProductByid(): Product {
    return {
      
    }
  }

  delteProduct(): void {

  }
}
