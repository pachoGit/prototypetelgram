import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesGroupComponent } from './messages-group/messages-group.component';


@NgModule({
  declarations: [
    HomeComponent,
    MessagesComponent,
    MessagesGroupComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
