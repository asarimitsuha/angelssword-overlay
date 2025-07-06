import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TwitchGetClipData } from 'src/app/interfaces/twitch.interface';
import { ClipQueueService } from 'src/app/services/clip-queue/clip-queue.service';
import { environment } from 'src/environments/environment';
declare var Twitch: any;

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent implements OnInit {
  clip: TwitchGetClipData | null = null;
  clipUrl?: SafeResourceUrl;

  constructor(public modalRef: MdbModalRef<PreviewModalComponent>, private sanitizer: DomSanitizer, private clipQueue: ClipQueueService) { }

  ngOnInit(): void {
    console.log(this.clip);
    this.clipUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.clip?.embed_url + '&autoplay=true&muted=false&parent=' + environment.domain);
    const options = {
      width: 470,
      height: 264,
      video: this.clip?.video_id
    };
    console.log(options);
    var player = new Twitch.Player("clip", options);
    console.log(player);
    player.setVolume(0.5);
  }

  add(clip: TwitchGetClipData | null): void {
    if (clip) {
      this.clipQueue.add(clip);
      this.modalRef.close();
    }
  }

}
