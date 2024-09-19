import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MessageService } from '../message/message.service';
import { IMessage } from '../../components/chatroom/message-list/message-list.component';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatroomService {
  private http = inject(HttpClient);
  private messageService: MessageService = inject(MessageService);

  private base_url = 'http://localhost:4000/api/chatrooms';
  private socket: Socket = io('http://localhost:4000');

  private prev_chatroom_id: number | null = null;

  private drawerState = new BehaviorSubject<{
    isOpen: boolean;
    chatroom_id: number;
    messages: IMessage[];
  }>({ isOpen: false, chatroom_id: Number(null), messages: [] });
  drawerState$ = this.drawerState.asObservable();

  private markerSubject = new Subject();
  markerSubject$ = this.markerSubject.asObservable();

  getAllChatrooms(): Observable<any> {
    return this.http.get(this.base_url);
  }

  getChatroomById(id: number): Observable<any> {
    return this.http.get(`${this.base_url}/${id}`);
  }

  createChatroom(latitude: number, longitude: number): Observable<any> {
    return this.http.post(this.base_url, { latitude, longitude });
  }

  addMarker(latitude: number, longitude: number) {
    this.socket.emit('marker_add', { latitude, longitude });
  }

  listenMarker() {
    this.socket.on('marker_added', (latlng) => {
      this.markerSubject.next(null);
    })
  }

  joinChatroom(chatroom_id: number) {
    if(!this.prev_chatroom_id) {
      this.prev_chatroom_id = chatroom_id;
      this.socket.emit('join_room', chatroom_id);
    };
    if(chatroom_id !== this.prev_chatroom_id) {
      this.leaveChatroom(chatroom_id);
      this.prev_chatroom_id = chatroom_id;
      this.socket.emit('join_room', chatroom_id);
    }

    this.messageService.getMessages(chatroom_id).subscribe({
      next: (messages: IMessage[]) => {
        this.drawerState.next({ isOpen: true, chatroom_id, messages });
      },
    });
  }

  leaveChatroom(chatroom_id: number){
    this.socket.emit('leave_room',chatroom_id);
    this.prev_chatroom_id = null;
  }

  sendMessage(chatroom_id: number, message: IMessage) {
    this.socket.emit('new_message', {chatroom_id, message});
  }

  listenMessage() {
    this.socket.on('message_received', (response) => {
      this.joinChatroom(response.chatroom_id);
    })
  } 
}
