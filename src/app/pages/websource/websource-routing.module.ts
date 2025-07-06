import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClipsComponent } from '../websource/clips/clips.component';
import { KickChatComponent } from './kick-chat/kick-chat.component';

const routes: Routes = [
    {
        path: 'clips/:streamerName',
        component: ClipsComponent
    },
    {
        path: 'chat/kick',
        component: KickChatComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebsourceRoutingModule { }
