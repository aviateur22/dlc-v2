import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { FriendComponent } from './components/friend/friend.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const dlcRoutes: Routes = [
  { path: "products", component: ProductsComponent, title: "produits en suivi"},
  { path: "product/:id", component: ProductDetailComponent, title: "produits en suivi"},
  { path: "add-product", component: ProductComponent, title: "ajout produit"},
  { path: "home", component: HomeComponent, title: "accueil"},
  { path: "account", component: AccountComponent, title: "mon compte"},
  { path: "friend", component: FriendComponent, title: "gestion de mes amis"},
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    FriendComponent,
    HomeComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dlcRoutes)
  ]
})
export class DlcModule { }
