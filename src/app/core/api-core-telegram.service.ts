import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const MTProto = require('@mtproto/core/envs/browser');

@Injectable({
  providedIn: 'root',
})
export class ApiCoreTelegramService {
  private mtproto: any;

  constructor() {
    this.mtproto = new MTProto({
      api_id: environment.apiID,
      api_hash: environment.apiHash,
      test: false,
    });
  }

  // @ts-ignore
  async call(method, params = {}, options = {}): Promise<any> {
    try {
      return await this.mtproto.call(method, params, options);
    } catch (error: any) {
      console.log({ error });

      const { error_code, error_message } = error;

      // if (error_code === 420) {
      //   const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);
      //   const ms = seconds * 1000;

      //   await sleep(ms);

      //   return this.call(method, params, options);
      // }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_');

        const dcId = Number(dcIdAsString);

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId);
        } else {
          Object.assign(options, { dcId });
        }
      }

      return Promise.reject(error);
    }
  }

  // @ts-ignore
  async updatesOn(name, callback) {
    return this.mtproto.updates.on(name, callback);
  }
}
