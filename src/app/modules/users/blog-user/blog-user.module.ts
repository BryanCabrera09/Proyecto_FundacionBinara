import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BlogUserRoutingModule } from './blog-user-routing.module';
import { BlogUserComponent } from './pages/blog-user/blog-user.component';


@NgModule({
  declarations: [
    BlogUserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BlogUserRoutingModule
  ]
})
export class BlogUserModule { }
