import { Injectable } from "@angular/core";
import { UserInformation } from "../models/user-information";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserInformationImp implements UserInformation {
  id!: number;
  email!: string;
  roles!: string[];

  constructor(private localStorageService: LocalStorageService) {}

  getUserInformation(): UserInformation {
    const user: string|null = this.localStorageService.getData('user');

    if(!user) {
      throw new Error("impossible de récupérer les informations utilisateur");
    }

    var userSerialize = JSON.parse(user);
    this.id = userSerialize.id;
    this.email = userSerialize.email;
    this.roles = userSerialize.roles;    

    return {
      email: this.email,
      id: this.id,
      roles: this.roles
    };
  }
  
}