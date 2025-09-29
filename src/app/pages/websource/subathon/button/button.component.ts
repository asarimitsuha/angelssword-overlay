import { HttpSentEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  constructor(private http: HttpService) { }

  addKick(): void {
    this.http.get('/subathon/kick').subscribe(() => {});
  }

  addTwitch(): void {
    this.http.get('/subathon/twitch').subscribe(() => {});
  }
}
