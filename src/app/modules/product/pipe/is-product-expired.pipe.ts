import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isProductExpired'
})
export class IsProductExpiredPipe implements PipeTransform {

  transform(expiredDays: number, ...args: unknown[]): string {
    return expiredDays >= 0 ? '' : 'is--expired';
  }

}
