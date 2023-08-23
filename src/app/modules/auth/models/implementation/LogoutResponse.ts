import { HttpResponse } from "../http-response";

export class LogoutResponse implements HttpResponse {
  message: string;
  constructor(message: string) {
    this.message = message;
  }  
}