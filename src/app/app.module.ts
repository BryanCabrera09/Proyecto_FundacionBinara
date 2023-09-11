import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Import js Scripts */
import { LoadScriptService } from './core/services/load-script.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/* GtagImport */
import { GtagModule } from 'angular-gtag';
import { GoogleAnalyticsService, NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN, NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    /* NgxGoogleAnalyticsModule.forRoot('G-6PGZ63FVGS'), */
    NgxGoogleAnalyticsRouterModule
    /* GtagModule.forRoot({ trackingId: 'G-6PGZ63FVGS', trackPageviews: true, }), */
  ],
  providers: [
    LoadScriptService,
    { provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN, useValue: 'G-6PGZ63FVGS' }, // Reemplaza con tu UA-ID
    GoogleAnalyticsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
