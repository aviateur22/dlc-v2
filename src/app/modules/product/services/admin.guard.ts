import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Injectable()
export class AdminGuard implements CanActivate {

  // Role admin
  ADMIN_ROLE_NAME: string = "ROLE_ADMIN";

  private isLoggedIn: boolean = this.initializeIsLoggedIn();
  private isAdmin:  boolean = this.initializeIsAdmin();

  constructor(
    private isLoggedInService: IsLoggedInService,
    private localStorageService: LocalStorageService,
    private router: Router
    ) {
      this.isLoggedInService.isLoggedInObservable.subscribe(isLoggedIn=> this.isLoggedIn = isLoggedIn);
      this.localStorageService.getData('user')
  }

  initializeIsLoggedIn(): boolean {
    const isLoggedIn: string|null  = this.localStorageService.getData('isLoggedIn');
    if(isLoggedIn != null) return Boolean(isLoggedIn);
    return false;
   }

  initializeIsAdmin(): boolean {
    const user: string|null = this.localStorageService.getData('user');

    if(!this.isLoggedIn || user === null) return false;
    
    const userData = JSON.parse(user);
    const roles: Array<string> = userData.roles;
    return roles.filter(x=>x === this.ADMIN_ROLE_NAME).length > 0;
  }
  
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.isLoggedIn || !this.isAdmin) {
        this.router.navigate([frontEndUrl.forbidden.url]);
        return false;
      }
   
    return true;
  }
  
}
