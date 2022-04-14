import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TwitchGetClipData } from 'src/app/interfaces/twitch.interface';
import { environment } from 'src/environments/environment';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';

@Component({
  selector: 'app-clip-preview',
  templateUrl: './clip-preview.component.html',
  styleUrls: ['./clip-preview.component.scss']
})
export class ClipPreviewComponent {
  @Input() clip?: TwitchGetClipData;
  modalRef: MdbModalRef<PreviewModalComponent> | null = null;

  constructor(private sanitizer: DomSanitizer, private modal: MdbModalService) { }

  openModal(): void {
    this.modalRef = this.modal.open(PreviewModalComponent, {
      data: {
        clip: this.clip
      }
    });
  }
}
