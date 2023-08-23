import { HttpResponse } from "../http-response";

export class CreateAccountResponse implements HttpResponse {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
  
}