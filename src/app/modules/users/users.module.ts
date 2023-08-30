import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    WelcomeUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class UsersModule { }
