import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { ChatMessage } from 'src/app/components/chat/chat.interface';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-kick-chat',
  templateUrl: './kick-chat.component.html',
  styleUrls: ['./kick-chat.component.scss']
})
export class KickChatComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('chatWrapper', {read: ViewContainerRef }) chatWrapper!: ViewContainerRef;
  @ViewChild('chat', {read: ViewContainerRef }) chat!: ViewContainerRef;
  containerList: ComponentRef<ChatComponent>[] = [];
  width = '620';
  height = '835';
  showKickLogo = false;
  chatLog: ChatMessage[] = [];

  constructor(private socket: SocketService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap(params => {
        this.width = `${ params['width'] || '620' }px`;
        this.height = `${ params['height'] || '835' }px`;
        this.showKickLogo = params['showKickLogo'] === 'true';
      }),
      switchMap(() => this.socket.connect('/socket/kickchat'))
    ).subscribe(socket => {
      const container = this.container.element.nativeElement;
      const chatWrapper = this.chatWrapper.element.nativeElement;

      this.socket.addListener<ChatMessage>(socket, 'KickChat').subscribe(chat => {
        if (!(this.chatLog.find(log => log.id === chat.id))) {
          this.chatLog.push(chat);
          const chatComponent = this.chat.createComponent(ChatComponent);
          chatComponent.setInput('message', chat);
          chatComponent.setInput('showKickLogo', this.showKickLogo);
          
          this.containerList.push(chatComponent);
          setTimeout(() => {
            container.scrollTop = chatWrapper.scrollHeight;
          }, 500);
          
          if (this.containerList.length > 25) {
            this.containerList[0].destroy();
            this.containerList.shift();
            this.chatLog.shift();
          }
        }
      });
    });
  }
}
