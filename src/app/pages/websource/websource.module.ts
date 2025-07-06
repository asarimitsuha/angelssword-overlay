import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipsComponent } from './clips/clips.component';
import { TwitchModule } from 'src/app/components/twitch/twitch.module';
import { WebsourceRoutingModule } from './websource-routing.module';
import { KickChatComponent } from './kick-chat/kick-chat.component';



@NgModule({
  declarations: [
    ClipsComponent,
    KickChatComponent
  ],
  imports: [
    CommonModule,
    WebsourceRoutingModule,
    TwitchModule
  ],
  exports: [
    ClipsComponent
  ]
})
export class WebsourceModule { }
