import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import text from 'src/app/utils/text';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  createAccountDataFormGroup: FormGroup = new FormGroup({});  
  isSubmitButtonDisable: boolean = false;
  //@ts-ignore
  submitButtonText: string = text.createAccount[environment.language];

  email: string|null = this.route.snapshot.paramMap.get('user');
  urlToken: string|null = this.route.snapshot.paramMap.get('confirmation');

  //@ts-ignore
  passwordMandatoryMessage: string = text.passwordMandatory[environment.language];

  //@ts-ignore
  confirmPasswordMandatoryMessage: string = text.confirmPasswordMandatory[environment.language];

  //@ts-ignore
  codeConfirmation: string = text.codeConfirmationMandatory[environment.language];
  
 constructor(
   private fb: FormBuilder,
   private authService: AuthService,
   private route: ActivatedRoute,
   private router: Router,
   private messageService: MessageService) {}

 ngOnInit() {     
   this.initializeCreateAccountData();
 }

 initializeCreateAccountData() {

  if(this.email == null || this.email?.trim() == "" || this.urlToken == null || this.urlToken?.trim() == "") {
    this.router.navigate([frontEndUrl.error.url]);
  }

   this.createAccountDataFormGroup = this.fb.group({     
     // Email
     email: [this.email, Validators.required],
     password: ['', Validators.required],
     confirmPassword: ['', Validators.required],
     token: ['', Validators.required],
     urlToken: [this.urlToken, Validators.required]
   })
 }

  /**
   * 
   */
  createAccount() {   
    this.isSubmitButtonDisable = true;

    if (!this.createAccountDataFormGroup.valid) {
      this.isSubmitButtonDisable = false;
      return this.createAccountDataFormGroup.markAllAsTouched();
    }

    this.authService.createAccount({
      email: this.createAccountDataFormGroup.get('email')?.value,
      password: this.createAccountDataFormGroup.get('password')?.value,
      confirmPassword: this.createAccountDataFormGroup.get('confirmPassword')?.value,
      token: this.createAccountDataFormGroup.get('token')?.value,
      urlToken: this.createAccountDataFormGroup.get('urlToken')?.value,
    }).subscribe((res)=>{  
      this.isSubmitButtonDisable = false;

      if(res != false) {
        this.createAccountDataFormGroup.reset();
        //@ts-ignore
        this.messageService.updateMessage(text.createAccountSuccess[environment.language]);
        this.router.navigate([frontEndUrl.success.url]);
      }
    });
  }
}
