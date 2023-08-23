import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import text from 'src/app/utils/text';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   loginDataFormGroup: FormGroup = new FormGroup({});
   isSubmitButtonDisable: boolean = false;

  //@ts-ignore
  submitButtonText: string = text.login[environment.language];

   //@ts-ignore
   emailMandatoryMessage: string = text.emailMandatory[environment.language];

   //@ts-ignore
   passwordMandatoryMessage: string = text.passwordMandatory[environment.language];

   registerEmailLink: string = frontEndUrl.registerEmail.url;

   //@ts-ignore
   registerMessage: string = text.stillNoAccount[environment.language]
   
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {      
    this.initializeLoginData();
  }

  initializeLoginData() {
    this.loginDataFormGroup = this.fb.group({     
      // Email
      email: ['', Validators.required],

      // Password
      password: ['', Validators.required]
    })
  }

  /**
   * 
   */
  login() {   
    this.isSubmitButtonDisable = true;

    if (!this.loginDataFormGroup.valid) {
      this.isSubmitButtonDisable = false;
      return this.loginDataFormGroup.markAllAsTouched();
    }

    this.authService.login({
      email: this.loginDataFormGroup.get('email')?.value,
      password: this.loginDataFormGroup.get('password')?.value
    }).subscribe(loginResponse=>{
      
      this.isSubmitButtonDisable = false; 

      if(loginResponse != false) {
        this.router.navigate([frontEndUrl.userHome.url])
      }
    });
  }
}
