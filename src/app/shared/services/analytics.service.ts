import { Injectable } from '@angular/core';

declare const gtag: Function; // Declarar gtag como función global

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  sendEvent(eventName: string, eventParams?: Record<string, any>) {
    gtag('event', eventName, eventParams);
  }

  // Método para obtener métricas de Google Analytics
  getMetrics(metricName: string) {
    // Puedes personalizar la lógica para obtener métricas según tus necesidades
    // Por ejemplo, para obtener el número de usuarios, puedes usar:
    const userMetrics = gtag('get', 'userMetrics');
    return userMetrics;
  }
}