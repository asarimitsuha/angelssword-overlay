import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private token: TokenService) { }

  get(url: string): Observable<any> {
    return this.http.get(`${ environment.apiUrl }${ url }`, {
      headers: new HttpHeaders({
        Authorization: this.token.store?.token || ''
      })
    });
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ url }`, data, {
      headers: new HttpHeaders({
        Authorization: this.token.store?.token || ''
      })
    });
  }
}
