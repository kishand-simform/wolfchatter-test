import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./components/map/map.component";
import { ChatroomComponent } from "./components/chatroom/chatroom.component";
import { ChatroomService } from './services/chatroom/chatroom.service';
import { IMessage } from './components/chatroom/message-list/message-list.component';
import { AsyncPipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, ChatroomComponent, AsyncPipe],
  providers: [ChatroomService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'wolfchatter-frontend';
  isOpen: boolean = false;
  chatroom_id!: number;

  messages: IMessage[] = [];

  private chatroomService = inject(ChatroomService);
  private unsubscribe$ = new Subject<void>();  // For cleaning up subscriptions

  ngOnInit() {
    // Subscribe to drawerState$ but ensure we clean up the subscription
    this.chatroomService.drawerState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ isOpen, chatroom_id, messages }) => {
        this.isOpen = isOpen;
        this.chatroom_id = chatroom_id;
        this.messages = messages;
      });
  }

  openChatroom() {
    this.isOpen = true;
  }

  closeChatroom() {
    this.isOpen = false;
  }

  // Clean up subscriptions when component is destroyed
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
