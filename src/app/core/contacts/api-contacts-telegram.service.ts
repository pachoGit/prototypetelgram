import { Injectable } from '@angular/core';
import { ApiCoreTelegramService } from '@core/api-core-telegram.service';

@Injectable({
  providedIn: 'root',
})
export class ApiContactsTelegramService {
  constructor(private apiCoreTelegram: ApiCoreTelegramService) {}

  async getContacts(): Promise<any> {
    return this.apiCoreTelegram.call('contacts.getContacts');
  }

  async getGroups(): Promise<any> {
    return this.apiCoreTelegram.call('channels.getGroupsForDiscussion');
  }

  async getUsers(ids: any[]) {
    const id = ids.map((i: any) => {
      return {
        _: 'inputUser',
        user_id: i.user_id,
      };
    });

    return this.apiCoreTelegram.call('users.getUsers', {
      id: id,
    });
  }
}
