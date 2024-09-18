import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route/route.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isNotWebsource = true;
  year = new Date().getFullYear();
  
  constructor(private route: RouteService) { }

  ngOnInit(): void {
    this.route.current().subscribe(url => {
      if (url.includes('/websource/')) {
        this.isNotWebsource = false;
      }
    });
  }

}
