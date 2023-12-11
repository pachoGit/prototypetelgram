import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCoreTelegramService } from '@core/api-core-telegram.service';
import { ApiMessagesTelegramService } from '@core/messages/api-messages-telegram.service';

@Component({
  selector: 'app-messages-group',
  templateUrl: './messages-group.component.html',
})
export class MessagesGroupComponent {
  messages: any[] = [];

  chatId: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiMessagesTelegram: ApiMessagesTelegramService,
    private apiCoreTelegram: ApiCoreTelegramService,
  ) {}

  ngOnInit(): void {
    const channel_id = this.activatedRoute.snapshot.paramMap.get('channel');

    this.chatId = channel_id;

    console.log({ channel_id });

    this.getMessages(channel_id);

    // Escuchar nuevos mensajes
    this.apiCoreTelegram.updatesOn(
      'updateShortChatMessage',
      (updateInfo: any) => {
        console.log({ updateInfo });
        if (updateInfo.chat_id == this.chatId) {
          this.messages.push({ ...updateInfo });
        }
      },
    );
  }

  // Obtener mensajes iniciales
  private getMessages(channel_id: any) {
    this.apiMessagesTelegram.getGroupMessages(channel_id).then((result) => {
      this.messages = result.messages;
      console.log({ result });
    });
  }
}
