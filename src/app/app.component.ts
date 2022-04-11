import { Component, OnInit } from '@angular/core';
import { RouteService } from './services/route/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'leaflit-overlays';
  noBackground = false;

  constructor(private route: RouteService) { }

  ngOnInit() {
    this.route.current().subscribe(url => {
      if (url.includes('/websource/clips')) {
        this.noBackground = true;
      }
    });
  }
}
