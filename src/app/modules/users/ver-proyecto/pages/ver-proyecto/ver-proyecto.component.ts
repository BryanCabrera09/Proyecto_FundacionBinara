import { Component, ElementRef, ViewChild } from '@angular/core';
import { Proyectos } from 'src/app/core/models/proyectos';
import { ProyectosService } from 'src/app/core/services/proyectos.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RegisterActivityComponent } from 'src/app/modules/manager/register-activity/pages/register-activity/register-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { Mapas } from 'src/app/core/models/mapas';
import { ActividadesService } from 'src/app/core/services/actividades.service';
import { Actividades } from 'src/app/core/models/actividades';

declare var google: any;

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css'],
  providers: [DatePipe]
})
export class VerProyectoComponent {
  proyecto!: Proyectos;
  provincia: string = "";
  canton: string = "";
  parroquia: string = "";
  lat: string = "";
  lng: string = "";

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private proyectosService: ProyectosService, private acticidadesService: ActividadesService) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.buscarProyectoPorId(id!);
  }

  buscarProyectoPorId(id: String): void {
    this.proyectosService.searchProject(id).subscribe({
      next: (data: any) => {
        this.proyecto = data.proyecto;
        this.provincia = data.proyecto.mapas[0].lugar.split(';')[0];
        this.canton = data.proyecto.mapas[0].lugar.split(';')[1];
        this.parroquia = data.proyecto.mapas[0].lugar.split(';')[2];
        this.lat = data.proyecto.mapas[0].coorX;
        this.lng = data.proyecto.mapas[0].coorY;
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
    this.getActividadesxProyecto(id!)

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
      data: { proyectoId: idProyecto }
    });
  }


  mapasArray: Mapas[] = [
    {
      _id: 'id invalido',
      lugar: 'Lugar 1',
      coorX: '-30.232545',
      coorY: '-179.78456'
    }
  ];

  public actividades: Actividades[] = [];

  detallesVisibles = new Set<number>();

  toggleDetalle(id: number) {
    if (this.detallesVisibles.has(id)) {
      this.detallesVisibles.delete(id);
    } else {
      this.detallesVisibles.add(id);
    }
  }

  getActividadesxProyecto(id: string): void {
    this.acticidadesService.getActivityxProyecto(id).subscribe(
      (data: Actividades[]) => {
        this.actividades = data;
      },
      error => {
        console.error('Hubo un error al obtener las actividades!', error);
      }
    );
  }
}
