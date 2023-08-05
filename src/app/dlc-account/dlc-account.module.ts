import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './components/account/account.component';
import { RouterModule, Routes } from '@angular/router';

const dlcAccountRoutes: Routes = [ 
  { path: "account", component: AccountComponent, title: "mon compte"} 
]

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dlcAccountRoutes)   

  ]
})
export class DlcAccountModule { }
