import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCoreTelegramService } from '@core/api-core-telegram.service';
import { ApiMessagesTelegramService } from '@core/messages/api-messages-telegram.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
  messages: any[] = [];

  chatId: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiMessagesTelegram: ApiMessagesTelegramService,
    private apiCoreTelegram: ApiCoreTelegramService,
  ) {}

  ngOnInit(): void {
    const channel_id = this.activatedRoute.snapshot.paramMap.get('channel');

    const access_hash = this.activatedRoute.snapshot.paramMap.get('hash');

    this.chatId = channel_id;

    console.log({ channel_id });

    console.log({ access_hash });

    this.getMessages(channel_id, access_hash);

    // Escuchar nuevos mensajes
    this.apiCoreTelegram.updatesOn('updateShortMessage', (updateInfo: any) => {
      console.log({ updateInfo });
      if (updateInfo.user_id == this.chatId) {
        this.messages.push({ ...updateInfo });
      }
    });
  }

  // Obtener mensajes iniciales
  private getMessages(channel_id: any, access_hash: any) {
    this.apiMessagesTelegram
      .getUserMessages(channel_id, access_hash)
      .then((result) => {
        this.messages = result.messages;
        console.log({ result });
      });
  }
}
