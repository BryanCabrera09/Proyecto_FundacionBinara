import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Import js Scripts */
import { LoadScriptService } from './core/services/load-script.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/* GtagImport */
import { GtagModule } from 'angular-gtag';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GtagModule.forRoot({ trackingId: 'G-6PGZ63FVGS', trackPageviews: true, }),
  ],
  providers: [
    LoadScriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
