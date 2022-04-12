import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenModel } from './token.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private clientId = 's9rhtxonvlp2uwi30n4scgof8902hg';
  private scope = 'user:read:email clips:edit';
  store: TokenModel | null = null;

  constructor(private http: HttpClient) {

  }

  getToken(code?: string): Observable<TokenModel> {
    if (code) {
      return this.http.get<TokenModel>(`${ environment.apiUrl }/token/${ code }`).pipe(
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
    url += `?client_id=${ this.clientId }&redirect_uri=${ environment.tokenReturnUrl }&response_type=code&scope=${ this.scope }`;
    this.store = null;
    sessionStorage.removeItem('token');
    console.log(url);
    window.location.href = url;
  }
}
