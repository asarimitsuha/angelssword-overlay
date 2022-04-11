import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TokenModel } from 'src/app/services/token/token.interface';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private token: TokenService) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter(params => params.code)
    ).subscribe(params => {
      this.token.getToken(params.code).subscribe((token: TokenModel) => {
        if (token.type === 'Admin') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/login');
        }
      });
    });
  }
}
