import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import text from 'src/app/utils/text';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import frontEndUrl from 'src/app/utils/frontEndUrl';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css']
})
export class RegisterEmailComponent {
  registerEmailDataFormGroup: FormGroup = new FormGroup({});
  isSubmitButtonDisable: boolean = false;

  //@ts-ignore
  submitButtonText: string = text.registerEmail[environment.language];

  //@ts-ignore
  emailMandatoryMessage: string = text.emailMandatory[environment.language];

  
 constructor(
   private fb: FormBuilder,
   private authService: AuthService,
   private messageService: MessageService,
   private router: Router) {

 }

 ngOnInit() {   
   this.initializeCreateAccountData();
 }

 initializeCreateAccountData() {
   this.registerEmailDataFormGroup = this.fb.group({     
     // Email
     email: ['', Validators.required]
   })
 }
 
  /**
   * 
   */
  registerEmail() {   
    this.isSubmitButtonDisable = true;

    if (!this.registerEmailDataFormGroup.valid) {
      this.isSubmitButtonDisable = false;
      return this.registerEmailDataFormGroup.markAllAsTouched();
    }

    this.authService.registerEmail({
      email: this.registerEmailDataFormGroup.get('email')?.value
    }).subscribe(res=> {      
        this.isSubmitButtonDisable = false;

        if(res != false) {         
          this.registerEmailDataFormGroup.reset();
          //@ts-ignore
          this.messageService.updateMessage(text.registerEmailSuccess[environment.language]);
          this.router.navigate([frontEndUrl.success.url]);
        }
    });
  }
}
