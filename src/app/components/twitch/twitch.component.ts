import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild, EventEmitter, OnChanges } from '@angular/core';


@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss']
})
export class TwitchComponent implements AfterViewInit, OnChanges {
  @ViewChild('player') player?: ElementRef;
  @Input() thumbUrl?: string;
  @Input() size = {
    width: 1920,
    height: 1080,
    muted: false,
    autoplay: true
  }
  @Output() done = new EventEmitter();


  constructor() { }

  ngOnChanges(): void {
    if (this.thumbUrl && this.player) {
      this.player.nativeElement.src = this.generateClipUrl(this.thumbUrl);
    }
  }

  ngAfterViewInit(): void {
    if (this.thumbUrl && this.player) {
      this.player.nativeElement.src = this.generateClipUrl(this.thumbUrl);
      this.player.nativeElement.play();
    }
  }

  generateClipUrl(thumbUrl: string): string | undefined {
    const pattern = /(.+?)-preview-/;
    const matched = thumbUrl.match(pattern);
    
    if (matched) {
      return ` ${ matched[1] }.mp4`;
    }
    return;
  }

  clipDone(): void {
    this.done.emit();
  }
}
