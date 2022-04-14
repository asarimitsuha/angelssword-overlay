import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TwitchGetClipData } from 'src/app/interfaces/twitch.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ClipQueueService implements OnDestroy {
  private clipsQueue: TwitchGetClipData[] = [];
  clipSubject$: ReplaySubject<TwitchGetClipData[]> = new ReplaySubject(1);
  private submitted = false;
  queue = this.clipSubject$.asObservable();

  constructor(private http: HttpService) { }

  ngOnDestroy(): void {
    this.clipSubject$.complete();
  }

  add(clip: TwitchGetClipData): void {
    this.submitted = false;
    if (!this.clipsQueue.includes(clip)) {
      this.clipsQueue.push(clip);
      this.updateSubject();
    }
  }

  remove(removeClip: TwitchGetClipData): void {
    if (this.clipsQueue.includes(removeClip)) {
      this.clipsQueue = this.clipsQueue.filter(clip => clip !== removeClip);
      this.updateSubject();
    }
  }

  submit(): void {
    const submitValue = this.clipsQueue.map(clip => {
      return {
        streamerName: clip.broadcaster_name,
        creatorName: clip.creator_name,
        title: clip.title,
        thumbnailUrl: clip.thumbnail_url
      }
    });
    this.submitted = true;

    this.http.post('/clip-viewer', submitValue).pipe(
      take(1)
    ).subscribe(() => {
      this.clipsQueue = [];
      this.updateSubject();
    });
  }

  updateSubject(): void {
    this.clipSubject$.next(this.clipsQueue);
  }
}
