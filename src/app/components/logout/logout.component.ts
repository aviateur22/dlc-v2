import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';

@Component({
  selector: 'app-logout',
  template: `    
  <div *ngIf="isLoggedIn">
    <button (click)="logout()">deconnection</button>    
  </div>
    
  `,
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private isLoggedInService: IsLoggedInService
  ){}

  ngOnInit(){
    this.isLoggedInService.isLoggedInObservable.subscribe(isLoggedIn=>this.isLoggedIn = isLoggedIn);
  }

  logout(){
    this.authService.logout().subscribe();
  }

}
