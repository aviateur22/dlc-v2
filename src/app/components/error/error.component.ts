import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-error',
  template: `
  <div>
    <h1> Oups il y a eu un problème </h1>
    <p> {{ message }} </p>
    <a [routerLink]="'/'+ homeLink" routerLinkActive="active">page d'accueil</a>
  </div>
  `,
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  message: string = '';
  homeLink: string = frontEndUrl.home.url;

  constructor(
    private router: Router,
    private messageService: MessageService
    ){}

  ngOnInit(){
    this.messageService.messageObservable.subscribe(message=> this.message = message);

    if(this.message === null || this.message.trim() === '') {
      this.router.navigate([frontEndUrl.home.url]);
    }
  }

}
