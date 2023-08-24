import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Product } from '../models/product';
import { AddProduct } from '../models/add-product';
import { AddProductResponse } from '../models/implementation/AddProductResponse';
import { FlashMessageService } from 'src/app/services/flash-message.service';
import { UserInformationImp } from 'src/app/helpers/UserInformationImp';

import { environment } from 'src/environments/environment';
import endPointsApi from 'src/app/utils/endPointsApi';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import { MessageService } from 'src/app/services/message.service';
import { UrlHelper } from 'src/app/helpers/UrlHelper';
import { DeleteProductResponse } from '../models/implementation/DeleteProductResponse';

@Injectable()
export class ProductService {

  private baseUrl: string = environment.domain + environment.api;
  
  products: Product[] = [];

  constructor(
    private http: HttpClient,
    private flashMessageService: FlashMessageService,
    private messageService: MessageService,
    private userInformation: UserInformationImp,
    private router: Router,
    private urlHelper: UrlHelper) {}

  findProductsByUser(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + endPointsApi.findProductsByUser.url.replace(":userId", userId.toString())).pipe(
      tap(products=> this.products = products),
      catchError(()=>{
        return of([])
      })
    );
  }

  addPoduct(product: AddProduct):Observable<AddProductResponse | boolean> {
    const productFormData = new FormData();

    productFormData.append('file', product.file);
    productFormData.append('productOpenDate', product.productOpenDate.toString());
    productFormData.append('productEndDate', product.productEndDate.toString());

    return this.http.post<AddProductResponse>(this.baseUrl + endPointsApi.addProduct.url, productFormData).pipe(
      tap(res=>{

        this.findProductsByUser(this.userInformation.getUserInformation().id).subscribe();

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

  findProductByProductIdAndUserId(userId: number, productId: number): Observable<Product|boolean> {
    const findProductByUserIdAndProductIdUrl: string = this.urlHelper.formatApiEndPointFindProductByUserIdAndProductId(productId);   
    return this.http.get<Product>(findProductByUserIdAndProductIdUrl).pipe(       
      tap(res=>{      
      console.log(new Date(res.productEndDate.toString()))
      }),      
      catchError(()=>{
        this.messageService.updateMessage("impossible d'afficher le produit");
        this.router.navigate([frontEndUrl.error.url]);
        return of(false);
      })
    )
  }

  delteProduct(productId: number): Observable<DeleteProductResponse| boolean> {
    return this.http.delete<DeleteProductResponse>(this.baseUrl + endPointsApi.deleteProductByProductId.url.replace(":productId", productId.toString())).pipe(
      tap(res=>{
        this.flashMessageService.updateFlashMessage({
          isError: false,
          message: res.message
        })
      }),
      catchError(()=>{
        return of(false);
      })
    )
  }
}
