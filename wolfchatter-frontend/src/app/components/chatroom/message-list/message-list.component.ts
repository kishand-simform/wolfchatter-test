import { Component, inject, Input } from '@angular/core';
import { MessageService } from '../../../services/message/message.service';
import { CommonModule } from '@angular/common';

export interface IMessage {
  message_id: number;
  chatroom_id: number;
  username: number;
  message: string;
  created_at: string;
}

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  @Input()
  chatroom_id!: number;
  @Input()
  messages: IMessage[] = [];

  ngOnInit() {}
}
