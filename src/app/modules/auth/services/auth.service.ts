import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { Login } from '../models/login';
import { environment } from 'src/environments/environment';
import { RegisterEmailResponse } from '../models/implementation/RegisterEmailResponse';
import { CreateAccount } from '../models/create-account';
import { RegisterEmail } from '../models/register-email';
import { FlashMessageService } from 'src/app/services/flash-message.service';
import { CreateAccountResponse } from '../models/implementation/CreateAccountResponse';
import { LoginResponseImpl } from '../models/implementation/LoginResponseImpl';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivateAccountResponse } from '../models/implementation/ActivateAccountResponse';
import { ActivateAccount } from '../models/activate-account';
import { MessageService } from 'src/app/services/message.service';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';
import { LogoutResponse } from '../models/implementation/LogoutResponse';

import endPoints from 'src/app/utils/endPointsApi';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import { UserInformationImp } from 'src/app/helpers/UserInformationImp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessageService: FlashMessageService,
    private messageService: MessageService,
    private isLoggedInService: IsLoggedInService,
    private localStorageService: LocalStorageService,
    private userInformationImp: UserInformationImp
    ) {}

    private baseUrl: string = environment.domain + environment.api;
  
    registerEmail(registerEmail: RegisterEmail): Observable<RegisterEmailResponse|boolean> {
      return this.http.post<RegisterEmailResponse>(this.baseUrl + endPoints.registerEmail.url, {
        email: registerEmail.email
      }).pipe(      
        tap(res=>this.flashMessageService.updateFlashMessage({
          isError: false, 
          message: res.message
        })),             
        catchError(()=>{             
          return of(false);
        })
      );
    }
    
    createAccount(createAccount: CreateAccount): Observable<CreateAccountResponse|boolean> {
      return this.http.post<CreateAccountResponse>(this.baseUrl + endPoints.createAccount.url, createAccount).pipe(      
        tap(res=>this.flashMessageService.updateFlashMessage({
          isError: false, 
          message: res.message
        })),     
        catchError(()=>{             
          return of(false);
        })
      );
    }

    activateAccount(activateAccount: ActivateAccount):Observable<ActivateAccountResponse|boolean>{
      return this.http.post<CreateAccountResponse>(this.baseUrl + endPoints.activateAccount.url, activateAccount).pipe(
        tap(res=>{
          this.flashMessageService.updateFlashMessage({
            isError: false,
            message: res.message
          })

        }),
        catchError(()=>{
          this.messageService.updateMessage('une erreur est survenue lors de l\'activation de votre compte')
          this.router.navigate([frontEndUrl.error.url])
          return of(false);
        })
      )
    }

    login(login: Login): Observable<LoginResponseImpl|boolean> {
      return this.http.post<LoginResponseImpl>(this.baseUrl + endPoints.login.url, {
        email: login.email,
        password: login.password
      }).pipe(             
        tap(res=> {
          this.localStorageService.addData("token", res.token);
          const resCopy =  {...res};
          //@ts-ignore
          delete resCopy.message;
          //@ts-ignore
          delete resCopy.token;

          this.isLoggedInService.update(true);         
          this.localStorageService.addData("user", JSON.stringify(resCopy));
          this.flashMessageService.updateFlashMessage({
            isError: false, 
            message: res.message
          });
        }),        
        catchError(()=>{

          return of(false);
        })
      );
    }

  logout(): Observable<LogoutResponse|boolean> {
    const userId: number = this.userInformationImp.getUserInformation().id;

    return this.http.get<LogoutResponse>(this.baseUrl + endPoints.logout.url.replace(':id', userId.toString())).pipe(
      tap(res => {
        this.isLoggedInService.update(false);
        

        this.localStorageService.clearOne("user");
        this.localStorageService.clearOne("token");   
        this.localStorageService.clearOne("isLoggedIn");   

        this.flashMessageService.updateFlashMessage({
          isError: false,
          message:res.message
        });

        this.router.navigate([frontEndUrl.home.url]);
      }),
      catchError(()=>{
        return of(false);
      })
    ); 
  }
}
