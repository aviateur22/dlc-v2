//@ts-nocheck
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterEmailComponent } from './components/register-email/register-email.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { LoginComponent } from './components/login/login.component';
import { ShareModule } from 'src/app/modules/share-component/share.module';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './services/auth.guard';

import text from 'src/app/utils/text';

const authRoutes: Routes = [
  { path: "auth/register-email", component: RegisterEmailComponent, title: text.registerMailPageTitle[environment.language], canActivate:[AuthGuard]},
  { path: "auth/create-account/user/:user/confirmation/:confirmation", component: CreateAccountComponent, title: text.createAccountPageTitle[environment.language], canActivate:[AuthGuard]},
  { path: "auth/account-activation/user/:user/confirmation/:confirmation", component: AccountActivationComponent, title: text.activationAccountPageTitle[environment.language], canActivate:[AuthGuard]},
  { path: "auth/login", component: LoginComponent, title: text.loginPageTitle[environment.language], canActivate:[AuthGuard]}
]
@NgModule({
  declarations: [ 
    LoginComponent,
    RegisterEmailComponent,
    CreateAccountComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    RouterModule.forChild(authRoutes)
  ],
  providers: [AuthGuard]
})
export class AuthModule { }
