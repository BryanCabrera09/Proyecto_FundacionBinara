import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RegisterActivityRoutingModule } from './register-activity-routing.module';
import { RegisterActivityComponent } from './pages/register-activity/register-activity.component'; 


@NgModule({
  declarations: [
    RegisterActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegisterActivityRoutingModule
  ]
})
export class RegisterActivityModule { }
