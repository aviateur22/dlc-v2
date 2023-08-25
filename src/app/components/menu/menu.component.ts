import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  homePageLink: string = frontEndUrl.userHome.url;
  friendPageLink: string = frontEndUrl.friendHome.url;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe();
  }
}
