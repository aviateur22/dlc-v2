import { Component } from '@angular/core';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-not-found',
  template: `
  <div class="main__container">
    <div class="inner__container">
      <div class="header__container">
        <a [routerLink]="'/'+ homeLink" routerLinkActive="active">accueil</a>
        <h2> Impossible d'afficher la page </h2>
      </div>
      <div>
        <div class="image__container">
          <img src='\\assets\\images\\icon.svg' alt="">          
        </div>
          <p class="message"> Désolé, votre demande n'a pas pu aboutir </p>
      </div>
    </div>
  </div>`,
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  homeLink: string = frontEndUrl.home.url;
}
