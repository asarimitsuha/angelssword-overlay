import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  form = this.formBuilder.group({
    kick: 1,
    twitch: 1
  });
  constructor(private http: HttpService,  private formBuilder: FormBuilder) { }

  addKick(): void {
    this.http.post('/subathon/kick', { count: this.form.controls.kick }).subscribe(() => {});
  }

  addTwitch(): void {
    this.http.post('/subathon/twitch/add', { count: this.form.controls.twitch }).subscribe(() => {});
  }
}
