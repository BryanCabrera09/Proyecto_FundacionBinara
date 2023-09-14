import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartData: any[] = []; // Almacena los datos para el gráfico

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
    const users = this.analyticsService.getMetrics('users');
    console.log('Number of users:', users);
    // Obtén los datos de Google Analytics
    this.analyticsService.getMetrics('users').subscribe((usersData: any) => {
      // Procesa los datos para el gráfico de barras
      this.chartData = this.processUserData(usersData);
    });
  }

  // Método para procesar los datos de usuarios
  private processUserData(usersData: any): any[] {
    // Formatea los datos para el gráfico de barras
    const formattedData = [
      {
        label: 'Usuarios',
        data: [usersData], // Coloca los datos en un arreglo
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
        borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
        borderWidth: 1 // Ancho del borde de las barras
      }
    ];
    return formattedData;
  }

}
