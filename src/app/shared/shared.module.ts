import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';

/* Angular Material */
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { TranslatePipe } from '../core/pipe/translate.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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
    MatCardModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    SidebarComponent
  ]
})
export class SharedModule { }
