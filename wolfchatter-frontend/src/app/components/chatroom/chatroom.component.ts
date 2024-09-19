import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ChatroomService } from '../../services/chatroom/chatroom.service';
import { IMessage, MessageListComponent } from "./message-list/message-list.component";
import { MessageInputComponent } from "./message-input/message-input.component";

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CommonModule, MessageListComponent, MessageInputComponent],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeDrawer = new EventEmitter<void>(); 
  @Input() chatroomId!: number;
  @Input() messages: IMessage[] = [];

  private chatroomService: ChatroomService = inject(ChatroomService);

  ngOnInit() {
    this.chatroomService.listenMessage();
  }

  openDrawer() {
    this.isOpen = true;
  }

  onCloseDrawer() {
    this.chatroomService.leaveChatroom(this.chatroomId);
    this.closeDrawer.emit();
  }
}

