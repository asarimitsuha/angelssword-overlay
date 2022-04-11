import { Injectable, isDevMode} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    private routeUrl: string;

    constructor(private token: TokenService, private router: Router) {
        this.routeUrl = this.router.url;
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const sessionToken = sessionStorage.getItem('token') || '';
        const token = this.token.store || sessionToken ? JSON.parse(sessionToken) : null;

        return new Promise((resolve, reject) => {
            if (!token) {
                this.routeUrl = '/token';
                this.token.killToken();
                return resolve(false);
            }
            else {
                if (token.type === 'Admin') {
                    return resolve(true);
                }
                return resolve(false);
            }
        });
    }
}