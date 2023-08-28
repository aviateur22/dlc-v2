import { Component } from '@angular/core';
import { FlashMessage } from 'src/app/modules/share-component/models/flash-message';
import { FlashMessageService } from 'src/app/services/flash-message.service';

@Component({
  selector: 'app-flash-message',
  template: `
    <div class="flash__container">      
      <ul class="flash__list">
        <li class="" class="flash__item {{ message.isError | flashMessageCategory}}" *ngFor="let message of flashMessages"> {{message.message}}</li>
    </ul>
  </div>
  `,
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent {

  constructor(private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    this.flashMessageService.flashMessageArrayObservable.subscribe(messages => {
      this.flashMessages = messages
    })
  }


  flashMessages: Array<FlashMessage> = [];

}
