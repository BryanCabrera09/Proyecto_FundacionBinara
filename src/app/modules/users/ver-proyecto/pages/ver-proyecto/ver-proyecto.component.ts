import { Component, ElementRef, ViewChild } from '@angular/core';
import { Proyectos } from 'src/app/core/models/proyectos';
import { ProyectosService } from 'src/app/core/services/proyectos.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RegisterActivityComponent } from 'src/app/modules/manager/register-activity/pages/register-activity/register-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { Proyectospost } from 'src/app/core/models/proyectospost';

declare var google: any;

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css'],
  providers: [DatePipe]
})
export class VerProyectoComponent {
  proyecto!: Proyectos;


  constructor(private dialog: MatDialog, private route: ActivatedRoute,private proyectosService: ProyectosService){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
   
    this.buscarProyectoPorId(id!);

    
  }

  buscarProyectoPorId(id: String): void {
    this.proyectosService.searchProject(id).subscribe({
      next: (data: any) => {
        this.proyecto = data.proyecto;
        console.log(this.proyecto);
      },
      error: error => {
        console.error('Error obteniendo el proyecto:', error);
      }
    });
    
    
  }
  getProvincia(lugar: any): string {
    return lugar.split(';')[2];
  }

  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map: any;

  

  mapOptions: any;

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.buscarProyectoPorId(id!);
   
    setTimeout(() => {
      this.mapInitializer();
    }, 2000); 
  }

  mapInitializer() {
    // Aseguramos que 'proyecto' y 'mapas' están definidos y obtenemos las coordenadas
    if (this.proyecto && this.proyecto.mapas && this.proyecto.mapas[0] && 
        typeof this.proyecto.mapas[0].coorX === 'string' && 
        typeof this.proyecto.mapas[0].coorY === 'string') {
        
        const coorX = parseFloat(this.proyecto.mapas[0].coorX); 
        const coorY = parseFloat(this.proyecto.mapas[0].coorY);

        this.mapOptions = {
            center: { lat: coorX, lng: coorY },
            zoom: 20
        };

        this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    } else {
        console.error("Datos del proyecto o mapas no disponibles o en formato incorrecto");
    }
}
abrirRegistrodeactividad(idProyecto: number) {
  this.dialog.open(RegisterActivityComponent, {
    width: '800px',
    hasBackdrop: false,
    height: '600px',
    data: { proyectoId: idProyecto}
  });
}



}
