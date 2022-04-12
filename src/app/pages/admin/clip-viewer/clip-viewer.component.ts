import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { TwitchGetClipData, TwitchGetClipsResponse } from 'src/app/interfaces/twitch.interface';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-clip-viewer',
  templateUrl: './clip-viewer.component.html',
  styleUrls: ['./clip-viewer.component.scss']
})
export class ClipViewerComponent implements OnInit {
  clips?: TwitchGetClipsResponse;
  added: TwitchGetClipData[] = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get('/clip-viewer').pipe(
      take(1)
    ).subscribe(clips => {
      this.clips = clips
    });
  }

  add(clip: TwitchGetClipData): void {
    if (!this.added.includes(clip)) {
      this.added.push(clip);
    }
  }

  submit(): void {
    const submitValue = this.added.map(clip => {
      return {
        streamerName: clip.broadcaster_name,
        creatorName: clip.creator_name,
        title: clip.title,
        thumbnailUrl: clip.thumbnail_url
      }
    });

    this.http.post('/clip-viewer', submitValue).pipe(
      take(1)
    ).subscribe(response => {
      this.added = [];
    });
  }
}
