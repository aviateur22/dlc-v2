import { HttpResponse } from "src/app/modules/auth/models/http-response";

export class AcceptFriendResponse implements HttpResponse {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}