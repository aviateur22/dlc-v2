import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HandlerHttpInterceptor } from './services/http.interceptor';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { FriendModule } from './modules/friend/friend.module';
import { AccountModule } from './modules/account/account.module';
import { HomeComponent } from './components/home/home.component';
import { ShareModule } from './modules/share-component/share.module';
import { ErrorComponent } from './components/error/error.component';
import { SuccessComponent } from './components/success/success.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ErrorComponent,
    ForbiddenComponent,
    HomeComponent,
    ErrorComponent,
    SuccessComponent,
    LogoutComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareModule,
    ProductModule,
    FriendModule,
    AccountModule,
    AuthModule,    
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HandlerHttpInterceptor,
    multi: true
  }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
