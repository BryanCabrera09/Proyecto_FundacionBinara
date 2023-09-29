import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NosotrosRoutingModule } from './nosotros-routing.module';



import { PaginaComponent } from './nosotros/pagina/pagina.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoDialogComponent } from './nosotros/info-dialog/info-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [

    PaginaComponent,
    InfoDialogComponent
  ],
  imports: [
    CommonModule,
    NosotrosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule

  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class NosotrosModule { }
