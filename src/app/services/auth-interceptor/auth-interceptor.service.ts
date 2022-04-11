import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private token: TokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const sessionToken = sessionStorage.getItem('token') || '';
        const token = this.token.store || sessionToken ? JSON.parse(sessionToken) : null;

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: token.token
                }
            });
        }

        return next.handle(req).pipe(
            tap(() => { }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }

                    this.token.killToken();
                }
            })
        );
    }
}