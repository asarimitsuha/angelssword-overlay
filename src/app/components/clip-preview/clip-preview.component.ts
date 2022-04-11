import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clip-preview',
  templateUrl: './clip-preview.component.html',
  styleUrls: ['./clip-preview.component.scss']
})
export class ClipPreviewComponent implements OnInit {
  @Input() clip = '';
  @Input() thumbnail = '';
  clipUrl?: SafeResourceUrl;
  showClip = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.clipUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.clip + '&parent=' + environment.domain);
  }

}
