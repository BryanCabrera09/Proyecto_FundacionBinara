import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NosotrosRoutingModule } from './nosotros-routing.module';



import { PaginaComponent } from './nosotros/pagina/pagina.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@NgModule({
  declarations: [
  
    PaginaComponent
  ],
  imports: [
    CommonModule,
    NosotrosRoutingModule,
    FormsModule,
    MatDialogModule,
    
  ],
  providers:[
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ]
})
export class NosotrosModule { }
