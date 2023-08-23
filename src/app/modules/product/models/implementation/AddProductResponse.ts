import { RequestResponse } from "../request-response";

export class AddProductResponse implements RequestResponse {
  message: string;
  productId: number;

  constructor(message: string, productId: number) {
    this.message = message;
    this.productId = productId;
  }  
}