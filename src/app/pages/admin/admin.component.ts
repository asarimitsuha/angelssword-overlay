import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userName?: string;

  constructor(private token: TokenService) { }

  ngOnInit(): void {
    this.userName = this.token.getTokenFromSession().displayName;
  }

}
