import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
import { SocketEvents } from './socket.events.constants';
import { UUID } from 'uuid-generator-ts';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private config = {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
    timeout: 20000,
    autoConnect: true,
    query: {},
    // options of the Engine.IO client
    upgrade: true,
    forceJSONP: false,
    jsonp: true,
    forceBase64: false,
    enablesXDR: true,
    timestampRequests: true,
    timestampParam: 't',
    transports: ['websocket'],
    transportOptions: {},
    rememberUpgrade: false,
    onlyBinaryUpgrades: false,
    // options for Node.js
    agent: false,
    rejectUnauthorized: true,
  };

  constructor() {
    // this.connect();
  }

  getSessionId(sessionIdType: string = 'default') {
    let sessionId = sessionStorage.getItem(sessionIdType);

    if (!sessionId) {
      sessionId = `${ sessionIdType }-${ UUID }`; 
      sessionStorage.setItem(sessionIdType, sessionId);
    }

    return sessionId;
  }

  connect(namespace?: string): Observable<Socket> {
    namespace = namespace ? `${ namespace }` : 'socket';
    console.log(`${environment.apiUrl}${namespace}`);
    const socket = io(`${environment.apiUrl}${namespace}`, this.config);
    let interval; 

    return new Observable(observer => {
      socket.on('connect', () => {
        console.log(`Connected to Angel's Sword server`);

        interval = setInterval(() => {
          socket.emit(SocketEvents.Players)
        }, 30000);

        socket.on('disconnect', () => {
          console.log('disconnected', namespace);
        });
        observer.next(socket);
      });
    });
  }

  addListener<T>(socket: Socket, eventName: string): Subject<T> {
    const subject = new Subject<T>();
    socket.on(eventName, (event: any) => {
      subject.next(event);
    });

    return subject;
  }

  
}
