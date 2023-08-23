import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-success',
  template: `
  <div>
    <h1> Félicitation </h1>
    <p> {{ message }} </p>
    <a [routerLink]="'/'+ homeLink" routerLinkActive="active">page d'accueil</a>
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
