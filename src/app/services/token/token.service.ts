import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenModel } from './token.interface';
import { EnviromentService } from '../enviroment/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private clientId = 's9rhtxonvlp2uwi30n4scgof8902hg';
  private scope = 'user:read:email clips:edit';
  store: TokenModel | null = null;
  private env = this.enviroment.get();

  constructor(private http: HttpClient, private enviroment: EnviromentService) {

  }

  getToken(code?: string): Observable<TokenModel> {
    if (code) {
      return this.http.get<TokenModel>(`${ this.env.apiDomain }/token/${ code }`).pipe(
        tap(response => {
          this.store = response;
          sessionStorage.setItem('token', JSON.stringify(response));
        })
      );
    }
    else {
      return throwError('NoValidToken');
    }
  }

  killToken(): void {
    let url = 'https://id.twitch.tv/oauth2/authorize';
    url += `?client_id=${ this.clientId }&redirect_uri=${ this.env.redirectUrl }&response_type=code&scope=${ this.scope }`;
    this.store = null;
    sessionStorage.removeItem('token');
    console.log(url);
    window.location.href = url;
  }
}
