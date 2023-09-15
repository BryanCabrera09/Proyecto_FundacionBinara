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
    if (this.proyecto && this.proyecto.mapas) {
      this.proyecto.mapas.forEach((mapa, index) => {
        if (mapa && typeof mapa.coorX === 'string' && typeof mapa.coorY === 'string') {
          
          const coorX = parseFloat(mapa.coorX);
          const coorY = parseFloat(mapa.coorY);
  
          const mapOptions = {
            center: { lat: coorX, lng: coorY },
            zoom: 15
          };
  
          const mapContainer = document.getElementById(`mapContainer${index}`) as HTMLElement;
          if (mapContainer) {
            const map = new google.maps.Map(mapContainer, mapOptions);
          } else {
            console.error(`Elemento mapContainer${index} no encontrado`);
          }
        } else {
          console.error("Datos del proyecto o mapas no disponibles o en formato incorrecto");
        }
      });
    } else {
      console.error("Datos del proyecto no disponibles");
    }
  }
  
  abrirRegistrodeactividad(idProyecto: number) {
    this.dialog.open(RegisterActivityComponent, {
      width: '800px',
      hasBackdrop: false,
      height: '600px',
      data: { proyectoId: idProyecto, editing:false }
    });
  }
  editarproyecto(activity: Actividades) {
    this.dialog.open(RegisterActivityComponent, {
      width: '800px',
      hasBackdrop: false,
      height: '600px',
      data: { actividad: activity, editing: true }
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

  confirmMessage: string = '';
  isConfirmVisible: boolean = false;
  projectToDelete: Actividades | null = null;

  confirmDeleteProject(activity: Actividades): void {
    if (activity.visible) {
        this.confirmMessage = `¿Está seguro de que desea DESACTIVAR el proyecto "${activity.titulo}"?`;
    } else {
        this.confirmMessage = `¿Está seguro de que desea ACTIVAR el proyecto "${activity.titulo}"?`;
    }
    this.projectToDelete = activity;
    this.isConfirmVisible = true;
  }

  confirm(): void {
    if (this.projectToDelete) {
      if (this.projectToDelete.visible) {
        this.desactivarProject(this.projectToDelete);
      } else {
        this.activarProject(this.projectToDelete);
      }
    }
    this.isConfirmVisible = false;
    this.projectToDelete = null;
  }
  cancel(): void {
    this.isConfirmVisible = false;
    this.projectToDelete = null;
  }

  desactivarProject(activity: Actividades): void {
    this.acticidadesService.deleteActivity(activity._id!).subscribe(
      response => {
        console.log('Actividad Desactivado con éxito', response);
        setTimeout(() => {
          location.reload();
        }, 200);
      },
      error => {
        console.error('Error al eliminar la actividad', error);
      }
    );
  }

  activarProject(activity: Actividades): void {
    this.acticidadesService.activarActividad(activity._id!).subscribe(
      response => {
        console.log('Actividad activado con éxito', response);
        setTimeout(() => {
          location.reload();
        }, 200);
      },
      error => {
        console.error('Error al eliminar la Actividad', error);
      }
    );
  }
  
}
