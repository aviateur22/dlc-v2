import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FlashMessageService } from './flash-message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class HandlerHttpInterceptor implements HttpInterceptor {

  constructor(private flashMessageService: FlashMessageService, private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!request.urlWithParams.includes('/auth/')){
      const token: string| null = this.localStorageService.getData('token');
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      
      tap({        
        next: event=> {      
          if(event instanceof HttpResponse) {
            return event.body
          }
          return event;
        },
        error: error=> {
          const errorHttp: HttpErrorResponse = error;      
          const errorStatus: number = parseInt(errorHttp.status.toString(), 10);
          return this.flashMessageService.updateFlashMessage({
            isError: true,
            message: error.error.errorMessage
          })
        }
      }        
    ));
  }
}
