import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlashMessage } from '../modules/share-component/models/flash-message';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {
  // Tableau de FlashMessage
  private flashMessages: Array<FlashMessage> = [];

  // Observable 
  private flashMessageArray = new BehaviorSubject(this.flashMessages);
  public flashMessageArrayObservable = this.flashMessageArray.asObservable(); 


  constructor() { }

   /**
   * Mise a jour du flash Message
   * @param message 
   */
   updateFlashMessage(message: FlashMessage) {
    this.flashMessages.push(message);
    this.flashMessageArray.next(this.flashMessages);
    this.clearFlashMessage();
  }

  /**
   * Clear FlashMessage 5sec
   */
  private clearFlashMessage(){
    setTimeout(()=>{
      this.flashMessages.pop();
      this.flashMessageArray.next(this.flashMessages)
    }, 5000 )
  }
}
