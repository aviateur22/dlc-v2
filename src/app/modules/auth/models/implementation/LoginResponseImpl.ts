import { LoginResponse } from "../login-response";

export class LoginResponseImpl implements LoginResponse {
  token: string;
  message: string; 
  roles: string[];
  email: string;

  constructor(token: string, message: string, roles: Array<string>, email: string) {
    this.token = token;    
    this.message = message;
    this.roles = roles;
    this.email = email;
  }
}