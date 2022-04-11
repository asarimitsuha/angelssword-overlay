import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNotWebsource = true;
  showNav = false;

  constructor(private route: RouteService) { }

  ngOnInit(): void {
    this.route.current().subscribe(url => {
      if (url.includes('/websource/')) {
        this.isNotWebsource = false;
      }
      if (url.includes('/admin')) {
        this.showNav = true;
      }
    });
  }

}
