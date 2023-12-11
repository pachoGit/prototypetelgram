import { Injectable } from '@angular/core';
import { ApiCoreTelegramService } from '@core/api-core-telegram.service';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthTelegramService {
  constructor(private apiCoreTelegram: ApiCoreTelegramService) {}

  // @ts-ignore
  async sendCode(phone: string): Promise<any> {
    return this.apiCoreTelegram.call('auth.sendCode', {
      phone_number: phone,
      settings: {
        _: 'codeSettings',
      },
    });
  }

  // @ts-ignore
  async signIn({ phone_code, phone_number, phone_code_hash }): Promise<any> {
    return this.apiCoreTelegram.call('auth.signIn', {
      phone_code: phone_code,
      phone_number: phone_number,
      phone_code_hash: phone_code_hash,
    });
  }

  async getUser() {
    return this.apiCoreTelegram.call('users.getFullUser', {
      id: {
        _: 'inputUserSelf',
      },
    });
  }
}
