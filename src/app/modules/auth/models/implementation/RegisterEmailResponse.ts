import { HttpResponse } from "../http-response";

export class RegisterEmailResponse implements HttpResponse {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}