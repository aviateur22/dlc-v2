import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  
  @Input() link: string | undefined;
  @Input() imageButtonPath: string | undefined;
  @Input() linkName: string | undefined;
  
  constructor(private router: Router) {}

  navigateTo(){
    if(this.link != undefined) {
      this.router.navigate([this.link]);
    }
  }
}
