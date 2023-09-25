import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Material */
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../core/pipe/translate.pipe';

import { DialogModule } from 'primeng/dialog';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    TranslatePipe,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    CdkMenuModule,
    RouterModule,
    OverlayModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    SidebarComponent
  ]
})
export class SharedModule { }
