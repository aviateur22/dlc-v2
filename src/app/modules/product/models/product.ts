export interface Product {
  productId: number;
  userId: number;
  path: string;
  fileName: string;
  imageBase64: string,
  productEndDate: Date,
  productOpenDate: Date;
  createdAt: Date;
  numberOfOpenDays: number;
  numberOfDayLeftBeforeExpired: number; 
}
