import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';


const dlcProductRoutes: Routes = [
  { path: "products", component: ProductsComponent, title: "produits en suivi"},
  { path: "product/:id", component: ProductDetailComponent, title: "produits en suivi"},
  { path: "add-product", component: ProductComponent, title: "ajout produit"},
  { path: "home", component: HomeComponent, title: "accueil"}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(dlcProductRoutes)
  ]
})
export class DlcProductModule { }
