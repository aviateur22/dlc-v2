import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-success',
  template: `
    <div class="main__container">
    <div class="inner__container">
      <div class="header__container">
        <a [routerLink]="'/'+ homeLink" routerLinkActive="active">accueil</a>
        <h2> Félicitation </h2>
      </div>
      <div>
        <div class="image__container">
          <img src='\\assets\\images\\icon.svg' alt="">          
        </div>
          <p class="message"> {{ message }} </p>
      </div>
    </div>
  </div>    
  `,
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  message: string = '';
  homeLink: string = frontEndUrl.home.url;

  constructor(
    private messageService: MessageService,
    private router: Router
    ) {}
  
  ngOnInit(){
    this.messageService.messageObservable.subscribe(message=>this.message = message);

    if(this.message === null || this.message.trim() === '') {
      this.router.navigate([frontEndUrl.home.url]);
    }
  }
  

}
