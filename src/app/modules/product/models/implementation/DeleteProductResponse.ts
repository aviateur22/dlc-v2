import { HttpResponse } from "src/app/modules/auth/models/http-response";

export class DeleteProductResponse implements HttpResponse {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
  
}