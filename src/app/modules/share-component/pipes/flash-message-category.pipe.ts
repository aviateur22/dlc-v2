import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flashMessageCategory'
})
export class FlashMessageCategoryPipe implements PipeTransform {

  transform(isError: boolean, ...args: unknown[]): string {
    console.log(isError)

    switch(isError) {
      case true :
        return "is--error";
        break;
      case false: 
        return "is--success";
        break;
      default: 
        return "is--error";
        break;
    }
  }

}
