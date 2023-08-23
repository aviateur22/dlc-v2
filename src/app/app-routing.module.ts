//@ts-nocheck
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { environment } from 'src/environments/environment';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ErrorComponent } from './components/error/error.component';
import { SuccessComponent } from './components/success/success.component';
import { HomeComponent } from './components/home/home.component';

import frontEndUrl from './utils/frontEndUrl';
import text from 'src/app/utils/text';


const routes: Routes = [
  { path: frontEndUrl.forbidden.url,  component: ForbiddenComponent, title: text.forbiddenPageTitle[environment.language]},
  { path: frontEndUrl.error.url, component: ErrorComponent, title: text.errorPageTitle[environment.language]},
  { path: frontEndUrl.success.url, component: SuccessComponent, title: text.successPageTitle[environment.language]},
  { path: frontEndUrl.home.url, component: HomeComponent, title: text.homePageTitle[environment.language]},
  { path:"", redirectTo: frontEndUrl.home, pathMatch: "full"},
  { path: "**", component: NotFoundComponent, title: text.notFoundPageTitle[environment.language]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
