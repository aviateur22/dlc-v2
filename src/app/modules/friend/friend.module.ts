//@ts-nocheck
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FriendComponent } from './components/friend/friend.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { HomeComponent } from './components/home/home.component';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import text from 'src/app/utils/text';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const friendRoutes: Routes = [  
  { path: frontEndUrl.friendHome.url, component: HomeComponent, title: text.friendHomePageTitle[environment.language]},
  { path: frontEndUrl.addFriend.url, component: AddFriendComponent, title: text.friendAddPageTitle[environment.language]},
]

@NgModule({
  declarations: [
    FriendComponent,
    AddFriendComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(friendRoutes)
  ]
})
export class FriendModule { }
