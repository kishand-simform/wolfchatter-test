import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);
  private base_url = 'http://localhost:4000/api/messages';

  create(chatroom_id: number, username: string, message: string): Observable<any> {
    return this.http.post(this.base_url, { chatroom_id, username, message });
  }

  getMessages(chatroom_id: number): Observable<any> {
    return this.http.get(`${this.base_url}/chatroom/${chatroom_id}`)
  }
}
