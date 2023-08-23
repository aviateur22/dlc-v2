import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import text from 'src/app/utils/text';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent {
  
  private email: string|null = '';
  private urlToken: string|null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.email = this.route.snapshot.paramMap.get('user');
    this.urlToken = this.route.snapshot.paramMap.get('confirmation');
   
    if(this.email === null || this.email.trim() === ''|| this.urlToken === null || this.urlToken.trim() === '') {
      this.router.navigate([frontEndUrl.error.url]);
    }     

    this.activateAccount();
  }

  
  activateAccount(){
    
    this.authService.activateAccount({
      //@ts-ignore
      activationToken: this.urlToken,
      //@ts-ignore
      email: this.email
    }).subscribe(res=>{
      if(res != false) {
        //@ts-ignore
        this.messageService.updateMessage(text.activateAccountSuccess[environment.language]);
        this.router.navigate([frontEndUrl.success.url]);
      }
    })
  }

}
