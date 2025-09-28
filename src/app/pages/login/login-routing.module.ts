import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { OauthComponent } from '../oauth/oauth.component';
import { LoginKickComponent } from '../login-kick/login-kick.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'oauth',
        component: OauthComponent
    },
    {
        path: 'kick',
        component: LoginKickComponent
    },
    {
        path: 'twitch',
        component: LoginKickComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
