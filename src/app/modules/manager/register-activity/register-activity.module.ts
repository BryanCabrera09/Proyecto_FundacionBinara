import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterActivityRoutingModule } from './register-activity-routing.module';
import { RegisterActivityComponent } from './pages/register-activity/register-activity.component'; 


@NgModule({
  declarations: [
    RegisterActivityComponent
  ],
  imports: [
    CommonModule,
    RegisterActivityRoutingModule
  ]
})
export class RegisterActivityModule { }
