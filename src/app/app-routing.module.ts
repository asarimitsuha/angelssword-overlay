import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { 
    path: 'login',
    loadChildren: () => import('./pages/login/login-routing.module').then(m => m.LoginRoutingModule)
  },
  { 
    path: 'token',
    loadChildren: () => import('./pages/token/token-routing.module').then(m => m.TokenRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'websource',
    loadChildren: () => import('./pages/websource/websource.module').then(m => m.WebsourceModule)
  },
  { 
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const NoNav: string[] = [
  '/admin',
  '/admin/previously',
  '/token'
];
