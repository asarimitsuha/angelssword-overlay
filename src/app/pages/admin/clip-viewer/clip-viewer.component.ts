import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { TwitchGetClipData, TwitchGetClipsResponse } from 'src/app/interfaces/twitch.interface';
import { ClipQueueService } from 'src/app/services/clip-queue/clip-queue.service';
import { HttpService } from 'src/app/services/http/http.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-clip-viewer',
  templateUrl: './clip-viewer.component.html',
  styleUrls: ['./clip-viewer.component.scss']
})
export class ClipViewerComponent implements OnInit {
  clips?: TwitchGetClipsResponse;
  submitted = false;
  added: TwitchGetClipData[] = [];
  streamer?: string;

  constructor(private http: HttpService, private token: TokenService, private clipQueue: ClipQueueService) { }

  ngOnInit(): void {
    this.streamer = this.token.getTokenFromSession().login;
    this.http.get('/clip-viewer').pipe(
      take(1)
    ).subscribe(clips => {
      this.clips = clips
    });

    this.clipQueue.queue.subscribe(clips => this.added = clips);
  }

  add(clip: TwitchGetClipData): void {
    this.clipQueue.add(clip);
  }

  submit(): void {
    this.clipQueue.submit();
  }

  remove(clip: TwitchGetClipData): void {
    this.clipQueue.remove(clip);
  }
}
