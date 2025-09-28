import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';
import { SubathonData } from './subathon.interface';
import { switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-subathon',
  templateUrl: './subathon.component.html',
  styleUrls: ['./subathon.component.scss']
})

export class SubathonComponent implements OnInit {
  goal = 100;
  kick = 0;
  twitch = 0;
  nextGoal = 'Loading...';
  loaded = false;

  constructor(private socket: SocketService, private http: HttpService) { }

  ngOnInit(): void {
    this.socket.connect('/socket/subathon').pipe(
      switchMap(socket => this.socket.addListener<SubathonData>(socket, 'Subathon'))
    ).subscribe(subathon => {
      this.goal = subathon.goal;
      this.kick = subathon.kick;
      this.nextGoal = subathon.nextGoal;
      this.twitch = subathon.twitch;
    });
    if (!this.loaded) {
      this.http.get('/subathon/update').subscribe(() => {});
      this.loaded = true;
    }
  }

  progressWidth(progress: number): string {
    const percentage = (progress / this.goal) * 100;
    
    return `width: ${percentage}%`;
  }
}
