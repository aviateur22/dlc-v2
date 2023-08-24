import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInformationImp } from 'src/app/helpers/UserInformationImp';
import { Product } from '../../models/product';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  productId: number | undefined;
  product: Product | undefined;
  productImage!: string;
  isDeleteButtonDisable: boolean = false;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private userInformation: UserInformationImp) {}

  ngOnInit() {
    const productId: string|null = this.route.snapshot.paramMap.get('productId');

    if(!productId) throw new Error("id produit manquant");
    this.productId = + productId;
    this.productService.findProductByProductIdAndUserId(this.userInformation.getUserInformation().id, +productId).subscribe(product=>{
      if(typeof(product) == 'object') {
        this.product = product;
        this.getProductImage();
      }
      
    });    
  }

  getProductImage(): void {
    //return this.product?.path;
   const base64: string = `data:png;base64,${this.product?.imageBase64}`;   
   this.productImage= base64;
  }

  deleteProduct() {   
    this.isDeleteButtonDisable = true;
    if(this.productId !=  undefined) this.productService.delteProduct(this.productId).subscribe(res=>{
      this.isDeleteButtonDisable = false;
      this.router.navigate([frontEndUrl.userHome.url]);
    });
  }
  navigateToHomePage() {
    this.router.navigate([frontEndUrl.userHome.url]);
  }
}
