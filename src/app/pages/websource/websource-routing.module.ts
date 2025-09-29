import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClipsComponent } from '../websource/clips/clips.component';
import { KickChatComponent } from './kick-chat/kick-chat.component';
import { SubathonComponent } from './subathon/subathon.component';
import { ButtonComponent } from './subathon/button/button.component';

const routes: Routes = [
    {
        path: 'clips/:streamerName',
        component: ClipsComponent
    },
    {
        path: 'chat/kick',
        component: KickChatComponent
    },
    {
        path: 'subathon',
        component: SubathonComponent
    },
    {
        path: 'subathon/add',
        component: ButtonComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebsourceRoutingModule { }
