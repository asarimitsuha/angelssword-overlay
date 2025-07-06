import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild, EventEmitter, OnChanges } from '@angular/core';
import { TwitchPlayer, TwitchPlayerEvent } from 'twitch-player';


@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss']
})
export class TwitchComponent implements AfterViewInit, OnChanges {
  // @ViewChild('player') player?: ElementRef;
  @Input() videoId?: string;
  @Input() size = {
    width: 1920,
    height: 1080,
    muted: false,
    autoplay: true
  }
  @Output() done = new EventEmitter();
  player!: TwitchPlayer;


  constructor() { }

  ngOnChanges(): void {
    // if (this.thumbUrl && this.player) {
    //   this.player.nativeElement.src = this.generateClipUrl(this.thumbUrl);
    // }
    console.log(this.videoId);
    this.player = TwitchPlayer.FromOptions('twitch-player', {
      width: 1920,
      height: 1080,
      video: this.videoId,
      autoplay: true,
      parent: ['localhost', 'overlay.angelssword.com']
    });

    this.player.setQuality('1080p60');
    this.player.setMuted(false);
    this.player.addEventListener(TwitchPlayerEvent.ENDED, () => this.done.emit());
  }

  ngAfterViewInit(): void {
    // if (this.thumbUrl && this.player) {
    //   this.player.nativeElement.src = this.generateClipUrl(this.thumbUrl);
    //   this.player.nativeElement.play();
    // }
  }

  generateClipUrl(thumbUrl: string): string | undefined {
    return `https://production.assets.clips.twitchcdn.net/v2/media/HedonisticConfidentSaladEagleEye-tJSq-FWCakMAnp6i/f1bd8545-067c-4335-b831-763a12465415/video.mp4`;
    // const pattern = /(.+?)-preview-/;
    // const matched = thumbUrl.match(pattern);
    
    // if (matched) {
    //   return ` ${ matched[1] }.mp4`;
    // }
    // return;
  }

  clipDone(): void {
    this.done.emit();
  }
}
