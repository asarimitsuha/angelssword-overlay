import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwitchComponent } from './twitch.component';



@NgModule({
  declarations: [
    TwitchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TwitchComponent
  ]
})
export class TwitchModule { }
