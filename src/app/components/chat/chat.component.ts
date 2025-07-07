import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ChatMessage } from './chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent {
  @Input() message!: ChatMessage;
  @Input() showKickLogo = false;
  @Input() alignRight = false;

  compileMessage(message: string): string {
    const regex = /\[(?:emote\:)(\d+)(?:\:)(\D+)\]/gm;
    return message.replace(regex, '<img alt="$2" src="https://files.kick.com/emotes/$1/fullsize" class="emote">');
  }

  generateBoxShadow(color: string): string {
    return `2px 0 3px ${color}, 0 2px 3px ${color}, -2px 0 3px ${color}, 0 -2px 3px ${color}`;
  }
}
