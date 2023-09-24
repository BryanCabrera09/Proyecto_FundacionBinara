import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { AuthorityComponent } from './authority/authority.component';

import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import { RolesDialogComponent } from './roles-dialog/roles-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NgModel } from '@angular/forms';

import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
  declarations: [
    AuthorityComponent,
    RolesDialogComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TableModule,
    MatDialogModule,
    DropdownModule,
    FormsModule,
    ToggleButtonModule
  ]
})
export class SettingsModule { }
