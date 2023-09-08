import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto-FundacionBinara';

  constructor(public router: Router, private gaService: GoogleAnalyticsService) {

    /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-6PGZ63FVGS', { 'page_path': event.urlAfterRedirects });
      }
    }) */
  }

  trackButtonClick() {
    // Ejemplo de envío de un evento de clic a Google Analytics
    this.gaService.event('button_click', 'Click en botón', 'Nombre del botón');
    console.log('Vale o no vale confirma')
  }

}
