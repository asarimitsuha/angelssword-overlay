import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TwitchGetClipData } from 'src/app/interfaces/twitch.interface';
import { ClipQueueService } from 'src/app/services/clip-queue/clip-queue.service';
import { environment } from 'src/environments/environment';

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
    this.clipUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.clip?.embed_url + '&autoplay=true&muted=false&parent=' + environment.domain);
  }

  add(clip: TwitchGetClipData | null): void {
    if (clip) {
      this.clipQueue.add(clip);
      this.modalRef.close();
    }
  }

}
