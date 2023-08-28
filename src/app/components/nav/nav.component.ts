import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IsLoggedInService } from 'src/app/services/is-logged-in.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="nav">
      <div class="inner__nav">
        <h2> DLC </h2>
        <div *ngIf="!isLoggedIn">
          <a [routerLink]="'/'+ loginPageLink">connexion</a>
        </div>
        <div (click)="navigateToMenu()" class="nav__button" *ngIf="isLoggedIn"></div>
      </div>
    </nav>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLoggedIn: boolean = false;
  loginPageLink: string = frontEndUrl.login.url;

  constructor(
    private router: Router,
    private isLoggedInService: IsLoggedInService
  ){}

  ngOnInit(){
    this.isLoggedInService.isLoggedInObservable.subscribe(isLoggedIn=>this.isLoggedIn = isLoggedIn);
  }

  navigateToMenu(){
    this.router.navigate([frontEndUrl.menu.url]);
  }
}
