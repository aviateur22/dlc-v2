import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { FlashMessageCategoryPipe } from './pipes/flash-message-category.pipe';

@NgModule({
  declarations: [
    FlashMessageComponent,
    FlashMessageCategoryPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlashMessageComponent
  ]
})
export class ShareModule { }
