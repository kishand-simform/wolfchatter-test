import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message/message.service';
import { ChatroomService } from '../../../services/chatroom/chatroom.service';
import { IMessage } from '../message-list/message-list.component';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  @Input()
  chatroom_id!: number;

  username: string | null = '';
  message: string | null = '';

  private messageService: MessageService = inject(MessageService);
  private chatroomService: ChatroomService = inject(ChatroomService);

  sendMessage() {
    if (this.username?.trim() && this.message?.trim()) {
      this.messageService.create(this.chatroom_id, this.username, this.message).subscribe({
        next: (message: IMessage) => {
          this.chatroomService.sendMessage(this.chatroom_id, message);
          this.clearForm();
        },
        error: (err) => {
          console.error('Error creating message:', err);
        }
      });
    } else {
      console.warn('Both username and message must be filled.');
    }
  }

  private clearForm() {
    this.message = '';
    this.username = '';
  }
}
