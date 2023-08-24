import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: Product | undefined;
  @Output() navigateToProductDetailEmit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() deleteProductEmit: EventEmitter<number> = new EventEmitter<number>();

  productImage!: string;
  isDeleteButtonDisable: boolean = false;

  ngOnInit() {
    this.getProductImage();
  }

  navigateToProductDetail() {
    this.navigateToProductDetailEmit.emit(this.product);
  }

  getProductImage(): void {
    //return this.product?.path;
   const base64: string = `data:png;base64,${this.product?.imageBase64}`;   
   this.productImage= base64;
  }

  deleteProduct(event: Event) {   
    event.stopPropagation();
    this.isDeleteButtonDisable = true;    
    this.deleteProductEmit.emit(this.product?.productId);
  }
}
