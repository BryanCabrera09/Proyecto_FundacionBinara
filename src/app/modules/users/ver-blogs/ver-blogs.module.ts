import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerBlogsRoutingModule } from './ver-blogs-routing.module';
import { VerBlogsComponent } from './pages/ver-blogs/ver-blogs.component';

import { FormsModule } from '@angular/forms';
import { BlogsService } from 'src/app/core/services/blogs.service';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@NgModule({
  declarations: [
    VerBlogsComponent
  ],
  imports: [
    CommonModule,
    VerBlogsRoutingModule,
    FormsModule,
    MatDialogModule
  ],

  providers:[
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
    BlogsService
  ]
})
export class VerBlogsModule { }
