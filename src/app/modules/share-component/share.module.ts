import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashMessageComponent } from './flash-message/flash-message.component';

@NgModule({
  declarations: [
    FlashMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlashMessageComponent
  ]
})
export class ShareModule { }
