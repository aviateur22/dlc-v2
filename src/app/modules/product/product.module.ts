//@ts-nocheck
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductService } from './services/product.service';
import { ProductGuard } from './services/product.guard';
import { AdminGuard } from './services/admin.guard';

import frontEndUrl from 'src/app/utils/frontEndUrl';
import text from 'src/app/utils/text';

const productRoutes: Routes = [  
  { path: frontEndUrl.getProductById.url, component: ProductDetailComponent, title: text.userHomePageTitle[environment.language], canActivate: [ProductGuard]},
  { path: frontEndUrl.addProduct.url, component: AddProductComponent, title: text.userAddProductPageTitle[environment.language], canActivate: [ProductGuard]},
  { path: frontEndUrl.userHome.url, component: HomeComponent, title: text.productDetailPageTitle[environment.language], canActivate: [ProductGuard]}
]

@NgModule({
  declarations: [
    ProductComponent,
    HomeComponent,
    AddProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(productRoutes)
  ],
  providers: [ProductService, ProductGuard, AdminGuard]
})
export class ProductModule { }
