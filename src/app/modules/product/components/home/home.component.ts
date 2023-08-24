import { Component } from '@angular/core';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import { ProductService } from '../../services/product.service';
import { UserInformationImp } from 'src/app/helpers/UserInformationImp';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { UrlHelper } from 'src/app/helpers/UrlHelper';

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
    private router: Router,
    private urlHelper: UrlHelper
  ) {}

  ngOnInit(){
    this.productService.findProductsByUser(this.userInformation.getUserInformation().id).subscribe(products=>this.products = products);
  }

  navigateToProductDetail(product: Product) {
    const productId: string = product.productId.toString();    
    this.router.navigate([frontEndUrl.getProductById.url.replace(":productId", productId)])
  }

  deleteProduct(productId: number) {
    if(productId != undefined) {
      console.log('rr')
      this.productService.delteProduct(productId).subscribe(res=>{
        if(res != false) {
          this.products = this.products.filter(product=> product.productId != productId);
        }
      });
    }
  }

}
