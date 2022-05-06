import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.scss']
})
export class ClipsComponent implements OnInit {
  clip?: {
    creatorName: string;
    title: string;
    thumbnailUrl: string;
  };
  streamerName?: string;
  private playIndex = 0;
  private clipsData = [];
  

  constructor(private http: HttpService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.streamerName = params.streamerName;
      this.http.get(`/clip-viewer/websource/${ this.streamerName }`).pipe(
        take(1)
      ).subscribe(data => {
        this.clipsData = data;
        this.playClips();
      });
    });
    
  }

  playClips(): void {
    this.clip = this.clipsData[this.playIndex];
    this.playIndex++;
  }
}
