import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FriendComponent } from './components/friend/friend.component';

const dlcFriendRoutes: Routes = [  
  { path: "friend", component: FriendComponent, title: "gestion de mes amis"},
]

@NgModule({
  declarations: [
    FriendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dlcFriendRoutes)
  ]
})
export class DlcFriendModule { }
