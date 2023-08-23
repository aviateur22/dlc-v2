import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
 // message
 private message: string = "";

 // Observable 
 private messageBehaviorSubject = new BehaviorSubject(this.message);
 public messageObservable = this.messageBehaviorSubject.asObservable(); 


 constructor() { }

  /**
  * Mise a jour du message
  * @param message 
  */
  updateMessage(message: string) {
   this.message = message;
   this.messageBehaviorSubject.next(this.message);  
 }
}
