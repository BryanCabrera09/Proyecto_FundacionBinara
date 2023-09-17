import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterMapRoutingModule } from './register-map-routing.module';
import { RegisterMapComponent } from './pages/register-map/register-map.component';


@NgModule({
  declarations: [
    RegisterMapComponent
  ],
  imports: [
    CommonModule,
    RegisterMapRoutingModule
  ]
})
export class RegisterMapModule { }
