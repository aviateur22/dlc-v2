import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmailComponent } from './components/register-email/register-email.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { LoginComponent } from './components/login/login.component';


const authRoutes: Routes = [
  { path: "auth/register-email", component: RegisterEmailComponent, title: "inscription"},
  { path: "auth/create-account", component: CreateAccountComponent, title: "création compte"},
  { path: "auth/account-activation", component: AccountActivationComponent, title: "activation du compte"},
  { path: "auth/login", component: LoginComponent, title: "connexion"},
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthModule { }
