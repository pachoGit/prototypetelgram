import { Injectable } from '@angular/core';
import { ApiCoreTelegramService } from '@core/api-core-telegram.service';

@Injectable({
  providedIn: 'root',
})
export class ApiMessagesTelegramService {
  constructor(private apiCoreTelegram: ApiCoreTelegramService) {}

  async getUserMessages(channel_id: any, access_hash: any): Promise<any> {
    return this.apiCoreTelegram.call('messages.getHistory', {
      peer: {
        _: 'inputPeerUser',
        user_id: channel_id,
        access_hash: access_hash,
      },
      max_id: 0,
      offset: 0,
      limit: 10,
    });
  }

  async getGroupMessages(channel_id: any): Promise<any> {
    return this.apiCoreTelegram.call('messages.getHistory', {
      peer: {
        _: 'inputPeerChat',
        chat_id: channel_id,
      },
      max_id: 0,
      offset: 0,
      limit: 10,
    });
  }
}
