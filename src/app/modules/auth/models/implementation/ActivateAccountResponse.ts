import { HttpResponse } from "../http-response";

export class ActivateAccountResponse implements HttpResponse {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}