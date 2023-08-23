import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Injectable()
export class ProductGuard implements CanActivate {

  private isLoggedIn: boolean = false;

  constructor(
    private isLoggedInService: IsLoggedInService,
    private router: Router
    ) {
      this.isLoggedInService.isLoggedInObservable.subscribe(isLoggedIn=> this.isLoggedIn = isLoggedIn)
  }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.isLoggedIn) {
        return true;
      }

    this.router.navigate([frontEndUrl.login.url]);
    return false;
  }
  
}
