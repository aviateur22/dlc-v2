import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { UserInformationImp } from 'src/app/helpers/UserInformationImp';
import { Product } from '../../models/product';

import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  addProductLink: string = frontEndUrl.addProduct.url;
  products: Array<Product> = [];
  
  constructor(
    private productService: ProductService,
    private userInformation: UserInformationImp,
    private router: Router
  ) {}

  ngOnInit(){
    this.productService.findProductsByUser(this.userInformation.getUserInformation().id).subscribe(products=>this.products = products);
  }

  navigateToProductDetail(product: Product) {
    const productId: string = product.id.toString();    
    this.router.navigate([frontEndUrl.getProductById.url.replace(":productId", productId)])
  }

  deleteProduct(productId: number) {
    if(productId != undefined) {
      this.productService.delteProduct(productId).subscribe(res=>{
        if(res != false) {
          this.products = this.products.filter(product=> product.id != productId);
        }
      });
    }
  }
}
