import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class IsLoggedInService {
  // message
 private isLoggedIn: boolean = this.initialize();

 // Observable 
 private isLoggedInBehaviorSubject = new BehaviorSubject(this.isLoggedIn);
 public isLoggedInObservable = this.isLoggedInBehaviorSubject.asObservable();

 constructor(private localStorageService: LocalStorageService) { }

 initialize(): boolean {
  const isLoggedIn: string|null  = this.localStorageService.getData('isLoggedIn');
  if(isLoggedIn != null) return Boolean(isLoggedIn);
  return false;
 }
  /**
  * Mise a jour du message
  * @param message 
  */
  update(isLoggedIn: boolean) {
    this.localStorageService.addData('isLoggedIn', isLoggedIn.toString());
    this.isLoggedIn = isLoggedIn;
    this.isLoggedInBehaviorSubject.next(this.isLoggedIn);  
 }
}