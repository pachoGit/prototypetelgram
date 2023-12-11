import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiContactsTelegramService } from '@core/contacts/api-contacts-telegram.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  contacts: any[] = [];

  groups: any[] = [];

  constructor(
    private apiContactsTelegram: ApiContactsTelegramService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.apiContactsTelegram.getContacts().then((result) => {
      this.contacts = result.users;
      console.log(this.contacts);
    });

    this.apiContactsTelegram.getGroups().then((result) => {
      this.groups = result.chats;
      console.log(this.groups);
    });
  }

  // Esto me trae los mensajes solo de los usuarios :D
  goToMessages(channel: any): void {
    this.router.navigate([
      'home/messages/channel',
      channel.id,
      'hash',
      channel.access_hash,
    ]);
  }

  goToGroups(channel: any): void {
    this.router.navigate(['home/messages-group/channel', channel.id, 'hash']);
  }
}
