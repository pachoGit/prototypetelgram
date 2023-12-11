import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesGroupComponent } from './messages-group/messages-group.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'messages/channel/:channel/hash/:hash',
    component: MessagesComponent,
  },

  {
    path: 'messages-group/channel/:channel/hash',
    component: MessagesGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
