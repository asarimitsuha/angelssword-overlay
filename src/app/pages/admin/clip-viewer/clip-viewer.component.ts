import { Component, OnInit, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
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
  @ViewChild('range') 
  DateRange?: DateRangePickerComponent;
  value: Date[];
  clips?: TwitchGetClipsResponse;
  submitted = false;
  added: TwitchGetClipData[] = [];
  streamer?: string;
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private http: HttpService, private token: TokenService, private clipQueue: ClipQueueService) { 
    const today = new Date();
    const startDate = new Date().setDate(today.getDate() - 7);
    this.value = [new Date(startDate), new Date(today)];
  }

  ngOnInit(): void {
    this.streamer = this.token.getTokenFromSession().login;
    this.http.get('/clip-viewer').pipe(
      take(1)
    ).subscribe(clips => {
      this.clips = clips;
    });

    this.clipQueue.queue.subscribe(clips => this.added = clips);
  }

  getClips(): void {
    const range: Date[] = this.DateRange?.value as Date[] || [];
    const startDate = new Date(range[0]).getTime();
    const endDate = new Date(range[1]).getTime();
    this.http.get(`/clip-viewer/${ startDate }/${ endDate }`).pipe(
      take(1)
    ).subscribe(clips => {
      this.clips = clips;
    });
  }

  add(clip: TwitchGetClipData): void {
    this.submitted = false;
    this.clipQueue.add(clip);
  }

  submit(): void {
    this.clipQueue.submit().subscribe(() => {
      this.submitted = true;
    });
  }

  remove(clip: TwitchGetClipData): void {
    this.clipQueue.remove(clip);
  }
}
