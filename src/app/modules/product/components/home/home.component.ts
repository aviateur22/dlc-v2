import { Component } from '@angular/core';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  addProductLink: string = frontEndUrl.addProduct.url;
  
  constructor() {}

  ngOnInit(){

  }

}
