import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="nav">
      <h2> DLC </h2>
      <div *ngIf="!isLoggedIn">
        <a [routerLink]="'/'+ loginPageLink">connexion</a>
      </div>
      <div (click)="toggleMenuVisibility()" class="nav__button"  *ngIf="isLoggedIn">
        <div class="nav__menu" *ngIf="isMenuVisible">
          <a [routerLink]="'/'+ friendPageLink">ami</a>
          <button (click)="logout()">déconnection</button>
        </div>        
      </div>     
    </nav>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLoggedIn: boolean = false;
  isMenuVisible: boolean = false;
  friendPageLink: string = frontEndUrl.error.url;
  loginPageLink: string = frontEndUrl.login.url;

  constructor(
    private authService: AuthService,
    private isLoggedInService: IsLoggedInService
  ){}

  ngOnInit(){
    this.isLoggedInService.isLoggedInObservable.subscribe(isLoggedIn=>this.isLoggedIn = isLoggedIn);
  }

  toggleMenuVisibility(){
    this.isMenuVisible = !this.isMenuVisible;
  }

  logout(){
    this.authService.logout().subscribe();
  }
}
